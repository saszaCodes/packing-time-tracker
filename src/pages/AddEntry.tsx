import { InputHTMLAttributes } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import { usePostOrders } from "../queries/hooks/usePostOrders";

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
  const { mutate } = usePostOrders();

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    mutate(values, { onSuccess: (res) => console.log(res) });
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
      <form data-testid="add-entry-form">
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
            { required: true }
          )}
          {generateInput(
            "units",
            "Liczba sztuk",
            { type: "number", placeholder: "Wpisz liczbę sztuk" },
            { required: true }
          )}
        </>
      </form>
      <button onClick={() => handleSubmit(onSubmit)()} title="Wyślij formularz">
        Wyślij formularz
      </button>
    </>
  );
};
