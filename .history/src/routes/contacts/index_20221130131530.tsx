import { component$ } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Contact, CONTACTS } from "./fake-db";

export const onGet: RequestHandler<Contact[]> = async () => {
  // Pretend we are fetching data from a database
  return await Promise.resolve(CONTACTS);
};

export default component$(() => {
  const endpoint = useEndpoint<typeof onGet>();
  return (
    <div>
      <h1>Contacts</h1>
      <p>Here are some contacts.</p>
    </div>
  );
});
