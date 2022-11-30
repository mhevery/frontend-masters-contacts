import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Contact, CONTACTS } from "./fake-db";
import CSS from "./index.css?inline";

export const onGet: RequestHandler<Contact[]> = async () => {
  // Pretend we are fetching data from a database
  return await Promise.resolve(CONTACTS);
};

export default component$(() => {
  useStylesScoped$(CSS);
  const endpoint = useEndpoint<typeof onGet>();
  return (
    <div>
      <h1>Contacts</h1>
      <input placeholder="Search" />
      <Resource
        value={endpoint}
        onPending={() => <div>Loading...</div>}
        onResolved={(contacts) => {
          return (
            <ul>
              {contacts.map((contact) => (
                <li>
                  <img src={contact.avatar} />
                  {contact.name}
                </li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
});
