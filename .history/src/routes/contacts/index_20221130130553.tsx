import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { CONTACTS } from "./fake-db";

export const onGet: RequestHandler = async () => {
  return CONTACTS;
};

export default component$(() => {
  return (
    <div>
      <h1>Contacts</h1>
      <p>Here are some contacts.</p>
    </div>
  );
});
