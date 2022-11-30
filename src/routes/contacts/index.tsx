import {
  component$,
  Resource,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import { Link, RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Contact, CONTACTS } from "./fake-db";
import CSS from "./index.css?inline";

export interface SimpleContact {
  id: string;
  name: string;
  avatar?: string;
}

export const onGet: RequestHandler<SimpleContact[]> = async () => {
  // Pretend we are fetching data from a database
  return CONTACTS.map((c) => ({
    name: c.name,
    id: c.id,
    avatar: c.avatar,
  }));
};

export default component$(() => {
  useStylesScoped$(CSS);
  const endpoint = useEndpoint<typeof onGet>();
  const filter = useSignal("");
  return (
    <div>
      <h1>Contacts</h1>
      <input
        placeholder="Search"
        onInput$={(event) => {
          filter.value = (event.target as HTMLInputElement).value;
        }}
      />
      <Resource
        value={endpoint}
        onPending={() => <div>Loading...</div>}
        onResolved={(contacts) => {
          return (
            <ul>
              {contacts
                .filter(
                  (c) =>
                    c.name.toLowerCase().indexOf(filter.value.toLowerCase()) >
                    -1
                )
                .map((contact) => (
                  <li>
                    <a href={"/contacts/" + contact.id + "/"}>
                      <img src={contact.avatar} />
                      {contact.name}
                    </a>
                  </li>
                ))}
            </ul>
          );
        }}
      />
    </div>
  );
});
