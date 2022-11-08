import { fireEvent, render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import {
  handlersRespondingWithError,
  handlersRespondingWithOK,
} from "../../mocks/handlers";
import { AddEntry } from "../../pages/AddEntry";
import { QueryProvider } from "../../queries/QueryProvider";
import { ordersUrl } from "../../utils/constants";

const server = setupServer(...handlersRespondingWithOK);
server.events.on("request:end", () => console.log("request:end"));
server.events.on("request:match", () => console.log("request:match"));
server.events.on("request:start", () => console.log("request:start"));
server.events.on("request:unhandled", () => console.log("request:unhandled"));
server.events.on("response:bypass", () => console.log("response:bypass"));
server.events.on("response:mocked", () => console.log("response:mocked"));
beforeAll(() => server.listen());
afterAll(() => server.close());

const mockSubmit = jest.fn();

it("TEST", () => {
  render(
    <div>
      <button title="TEST" />
    </div>
  );
  const submitBtn = screen.getByTitle<HTMLButtonElement>(/TEST/i);
  const clickSubmitBtn = () => fireEvent(submitBtn, new MouseEvent("click"));
  submitBtn.onclick = jest.fn();
  for (let i = 0; i < 3; i++) {
    clickSubmitBtn();
  }
  expect(submitBtn.onclick).toHaveBeenCalledTimes(3);
});

describe("AddEntry screen - functionalities", () => {
  render(
    <QueryProvider>
      <AddEntry />
    </QueryProvider>
  );
  const submitBtn = screen.getByTitle<HTMLButtonElement>(/Wyślij/i);
  const formInputs = {
    title: {
      element: screen.getByLabelText<HTMLInputElement>(/Tytuł/i),
      validValue: "Test",
    },
    areaName: {
      element: screen.getByLabelText<HTMLInputElement>(/Nazwa obszaru/i),
      validValue: "Obszar testowy",
    },
    type: {
      element: screen.getByLabelText<HTMLInputElement>(/Typ/i),
      validValue: "Test",
    },
    id: {
      element: screen.getByLabelText<HTMLInputElement>(/ID/i),
      validValue: "12345",
    },
    date: {
      element: screen.getByLabelText<HTMLInputElement>(/Data/i),
      validValue: "2022-10-10",
    },
    duration: {
      element: screen.getByLabelText<HTMLInputElement>(/Czas trwania/i),
      validValue: "541",
    },
    units: {
      element: screen.getByLabelText<HTMLInputElement>(/Liczba sztuk/i),
      validValue: "4812",
    },
  };

  const requiredFields: (keyof typeof formInputs)[] = [
    "title",
    "areaName",
    "date",
    "duration",
    "id",
    "type",
    "units",
  ];

  jest.mock("react-query", () => {
    const { handleSubmit: actualHandleSubmit, ...actualModule } =
      jest.requireActual("react-query");
    const handleSubmit = (cb?: () => void) =>
      actualHandleSubmit(() => {
        mockSubmit();
        cb?.();
      });
    return {
      ...actualModule,
      handleSubmit,
    };
  });

  const forEachFormField = (
    cb: (
      name: keyof typeof formInputs,
      element: HTMLInputElement,
      index: number
    ) => void
  ) => {
    Object.entries(formInputs).forEach((value, index) => {
      cb(value[0] as keyof typeof formInputs, value[1].element, index);
    });
  };

  const fillForm = (excl?: (keyof typeof formInputs)[]) =>
    forEachFormField((name, element) => {
      element.value = formInputs[name].validValue;
    });

  const clickSubmitBtn = async () => {
    await submitBtn.onclick?.(new MouseEvent("click"));
  };

  beforeEach(() => {
    fillForm();
    mockSubmit.mockClear();
  });

  it("Validates form - required fields", async () => {
    forEachFormField((name, element) => {
      if (!requiredFields.includes(name)) return;
      element.value = "";
      clickSubmitBtn();
      element.value = formInputs[name].validValue;
    });
    expect(mockSubmit).toHaveBeenCalledTimes(0);
    await clickSubmitBtn();
    expect(JSON.stringify(mockSubmit.mock.calls.length)).toBe("");
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
  it("Validates form - ID schema", () => {
    const invalidIds = ["1234", "125d2", "{}", "{{'{{", "bnguw", "123\\s"];
    invalidIds.forEach((invalidId) => {
      formInputs.id.element.value = invalidId;
      clickSubmitBtn();
    });
    expect(mockSubmit).toHaveBeenCalledTimes(0);
    formInputs.id.element.value = formInputs.id.validValue;
    clickSubmitBtn();
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  //TODO: fix tests

  // it("Sends form with appropriately parsed data", () => {
  //   return new Promise<void>((res, rej) => {
  //     server.events.on("request:start", (req) => {
  //       console.log(req);
  //       if (req.method === "POST" && req.destination === ordersUrl) res();
  //     });
  //     clickSubmitBtn();
  //   }).then(() => {
  //     // TODO: rewrite promise to make results more verbose
  //     expect(true).toBe(true);
  //   });
  // });
  // it("Provides feedback when sending failed", () => {
  //   const server = setupServer(...handlersRespondingWithError);
  //   server.listen();
  //   return new Promise<void>((res) => {
  //     server.events.on("request:end", () => res());
  //     clickSubmitBtn();
  //   })
  //     .then(() => {
  //       server.close();
  //       return screen.findByText<HTMLElement>(/Nie udało się wysłać/i);
  //     })
  //     .then((errorMessage) => {
  //       expect(errorMessage).toBeInTheDocument();
  //     });
  // });
  // it("Provides feedback and clears form data when sending succeeded", () => {
  //   return new Promise<void>((res) => {
  //     server.events.on("request:end", () => res());
  //     clickSubmitBtn();
  //   })
  //     .then(() => {
  //       forEachFormField((name, element) => {
  //         expect(element.value).toBe("");
  //       });
  //       return screen.findByText<HTMLElement>(/Formularz został wysłany/i);
  //     })
  //     .then((successMessage) => {
  //       expect(successMessage).toBeInTheDocument();
  //     });
  // });

  // TODO: decide on this test case (currently it would have no use, as all fields are found by their labels)
  // it("All fields are labeled", () => {
  //   let nonLabeledFields: string[] = []
  //   forEachFormField((name, element) => {
  //     if ()
  //   })
  // });

  // TODO: decide on this test case
  // it("All fields are visible", () => {
  //   forEachFormField((name, element) => {
  //     expect(element).toBeVisible();
  //   });
  // });

  it("All text inputs have placeholders", () => {
    forEachFormField((name, element) => {
      expect(element.placeholder.length).toBeGreaterThan(0);
    });
  });

  it("All buttons have titles", () => {
    const buttonTitle = submitBtn.title;
    expect(buttonTitle).toBeDefined();
  });
});
