import { InputHTMLAttributes, useRef } from "react";
import { useForm, RegisterOptions } from "react-hook-form";

type FormFields =
  | "title"
  | "areaName"
  | "type"
  | "units"
  | "id"
  | "date"
  | "duration"
  | "units";

export const AddEntry = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const formEl = useRef<HTMLFormElement>(null);

  const onSubmit = (e: any) => {
    const values = getValues();
    sendData(values);
  };

  const sendData = (e: any) => {
    // TODO: add sending and onsuccess callback
    console.log(e);
  };

  const generateInput = (
    name: FormFields,
    label: string,
    inputArgs?: Omit<InputHTMLAttributes<HTMLInputElement>, "id">,
    registerArgs?: Partial<RegisterOptions>
  ) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...inputArgs}
        {...register(name, { ...registerArgs })}
      />
      {/* TODO: add invalid fields feedback */}
      <span>{errors[name]?.message as string}</span>
    </div>
  );

  return (
    <>
      <form
        ref={formEl}
        // action={ordersUrl}
        // method="POST"
        data-testid="add-entry-form"
      >
        <>
          {generateInput(
            "title",
            "Tytuł",
            { type: "text", placeholder: "Wpisz tytuł" },
            { required: true }
          )}
          {generateInput(
            "areaName",
            "Nazwa obszaru",
            { type: "text", placeholder: "Wpisz nazwę obszaru" },
            { required: true }
          )}
          {generateInput(
            "type",
            "Typ",
            { type: "text", placeholder: "Wpisz typ" },
            { required: true }
          )}
          {generateInput(
            "id",
            "ID",
            { type: "number", placeholder: "Wpisz ID" },
            { required: true, pattern: /\d{5}/ }
          )}
          {generateInput(
            "date",
            "Data",
            { type: "text", placeholder: "Wpisz datę" },
            { required: true, pattern: /\d{4}-\d{2}-\d{2}/ }
          )}
          {generateInput(
            "duration",
            "Czas trwania",
            { type: "number", placeholder: "Wpisz czas trwania" },
            { required: true, pattern: /\d{4}-\d{2}-\d{2}/ }
          )}
          {generateInput(
            "units",
            "Liczba sztuk",
            { type: "number", placeholder: "Wpisz liczbę sztuk" },
            { required: true }
          )}
        </>
      </form>
      <button onClick={() => handleSubmit(onSubmit)()}>Wyślij formularz</button>
    </>
  );
};
