import { fireEvent, render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import {
  handlersRespondingWithError,
  handlersRespondingWithOK,
} from "../../mocks/handlers";
import { AddEntry } from "../../pages/AddEntry";
import { ordersUrl } from "../../utils/constants";

const server = setupServer(...handlersRespondingWithOK);
beforeAll(() => server.listen());
afterAll(() => server.close());

describe("AddEntry screen - functionalities", () => {
  render(<AddEntry />);
  const submitBtn = screen.getByText<HTMLButtonElement>(/Wyślij/i);
  const form = screen.getByTestId<HTMLFormElement>(/add-entry-form/i);
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

  form.onsubmit = jest.fn();

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
    forEachFormField((name, element, index) => {
      element.value = formInputs[name].validValue;
    });

  const clickSubmitBtn = () => fireEvent(submitBtn, new MouseEvent("click"));

  beforeEach(() => fillForm());
  // TODO: fix typescript
  // @ts-ignore
  afterEach(form.onsubmit.mockClear());

  it("Validates form - required fields", () => {
    forEachFormField((name, element) => {
      if (!requiredFields.includes(name)) return;
      element.value = "";
      clickSubmitBtn();
      element.value = formInputs[name].validValue;
    });
    expect(form.onsubmit).toHaveBeenCalledTimes(0);
    clickSubmitBtn();
    expect(form.onsubmit).toHaveBeenCalledTimes(1);
  });
  it("Validates form - ID schema", () => {
    const invalidIds = ["1234", "125d2", "{}", "{{'{{", "bnguw", "123\\s"];
    invalidIds.forEach((invalidId) => {
      formInputs.id.element.value = invalidId;
      clickSubmitBtn();
    });
    expect(form.onsubmit).toHaveBeenCalledTimes(0);
    formInputs.id.element.value = formInputs.id.validValue;
    clickSubmitBtn();
    expect(form.onsubmit).toHaveBeenCalledTimes(1);
  });
  it("Sends form with appropriately parsed data", () => {
    return new Promise<void>((res, rej) => {
      server.events.on("request:start", (req) => {
        if (req.method === "POST" && req.destination === ordersUrl) res();
      });
      clickSubmitBtn();
    }).then(() => {
      // TODO: rewrite promise to make results more verbose
      expect(true).toBe(true);
    });
  });
  it("Provides feedback when sending failed", () => {
    const server = setupServer(...handlersRespondingWithError);
    server.listen();
    return new Promise<void>((res) => {
      server.events.on("request:end", () => res());
      clickSubmitBtn();
    })
      .then(() => {
        server.close();
        return screen.findByText<HTMLElement>(/Nie udało się wysłać/i);
      })
      .then((errorMessage) => {
        expect(errorMessage).toBeInTheDocument();
      });
  });
  it("Provides feedback and clears form data when sending succeeded", () => {
    return new Promise<void>((res) => {
      server.events.on("request:end", () => res());
      clickSubmitBtn();
    })
      .then(() => {
        forEachFormField((name, element) => {
          expect(element.value).toBe("");
        });
        return screen.findByText<HTMLElement>(/Formularz został wysłany/i);
      })
      .then((successMessage) => {
        expect(successMessage).toBeInTheDocument();
      });
  });

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

  it("All buttons contain text", () => {
    expect(submitBtn).toBeVisible();
    const buttonText = submitBtn.title || submitBtn.innerText;
    expect(buttonText.length).toBeGreaterThan(0);
  });
});

describe("AddEntry screen - component visibility", () => {});
