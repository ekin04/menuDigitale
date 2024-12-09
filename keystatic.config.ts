import { config, fields, collection, singleton } from "@keystatic/core";
import { defaultTitle, keyStaticProject } from "./config";
import React from "react";

export default config({
  storage: import.meta.env.DEV === true ? { kind: "local" } : { kind: "cloud" },
  cloud: { project: keyStaticProject },
  locale: 'it-IT',
  ui: {
    brand: {
      name: defaultTitle,
      mark: () => {
        return React.createElement("img", {
          src: "/favicon/favicon.svg",
          width: 35,
        });
      },
    },
    navigation: {
      Menu: ["piatti", "categorie"],
      Impostazioni: ["impostazioni","navbarHeader","allergeni"],
    },
  },

  collections: {
    piatti: collection({
      label: "🍝 Piatti",
      slugField: "title",
      path: "src/content/blog/*",
      columns: ["title"],
      schema: {
        title: fields.slug({
          name: {
            label: "Titolo",
            validation: {
              isRequired: true,
            },
          },
        }),
        categoria: fields.relationship({
          label: "Categoria",
          collection: "categorie",
          validation: { isRequired: true },
        }),
        descrizione: fields.text({
          label: "Breve descrizione",
          description: "Inserisci una breve descrizione per il tuo piatto",
          multiline: true,
          validation: { isRequired: true },
        }),
        allergeni: fields.array(
            fields.relationship({
              label: 'Allergeni',
              description: 'lista degli allergeni presenti nel piatto',
              collection: 'allergeni',
              validation: { isRequired: true },
            }), {
              label: 'Allergeni',
              itemLabel: (item) => item.value || "Seleziona una categoria",
            }
          ),
        immagine: fields.image({
          label: "Immagine",
          directory: "src/assets/img/cms/piatti",
          publicPath: "/src/assets/img/cms/piatti",
        }),
      },
    }),
    allergeni: collection({
      label: "🤧 Allergeni",
      slugField: "title",
      path: "src/content/allergeni/*",
      schema: {
        title: fields.slug({
          name: {
            label: "Nome allergene",
            validation: {
              isRequired: true,
            },
          },
        }),
        descrizione: fields.text({
          label: "Descrizione",
          validation: { isRequired: true },
          multiline: true,
        }),
        icona: fields.image({
          label: "Icona",
          directory: "src/assets/img/cms/allergeni",
          publicPath: "/src/assets/img/cms/allergeni",
        }),
      },
    }),

    categorie: collection({
      label: "🍽️ Categorie Piatti",
      slugField: "title",
      path: "src/content/categorie/*",
      columns: ["title"],
      schema: {
        emptyContent: fields.emptyContent({ extension: "md" }),
        title: fields.slug({
          name: {
            label: "Titolo",
            description:
              "ATTENZIONE! se volete rimuovere una categoria assicuratevi prima di rimuoverla da tutti i piatti",
            validation: {
              isRequired: true,
            },
          },
        }),
        description: fields.text({
          label: "Breve descrizione",
          description: "Inserisci una breve descrizione per la categoria",
          multiline: true,
          validation: { isRequired: true },
        }),
        immagine: fields.image({
          label: "Immagine",
          directory: "src/assets/img/cms/categorie",
          publicPath: "/src/assets/img/cms/categorie",
        }),
      },
    }),
  },
  singletons: {
    navbarHeader: singleton({
      label: "🛠️ Navbar",
      path: "src/content/navbar/navbarHeader",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            label: fields.text({
              label: "Etichetta",
              validation: { isRequired: true },
            }),
            path: fields.text({
              label: "Percorso",
              validation: { isRequired: true },
            }),
            icon: fields.text({
              label: "Icona",
              description:
                "Puoi trovare le icone qui https://icon-sets.iconify.design/mdi/ es. mdi:mountain-outline",
            }),
            externalLink: fields.checkbox({
              label: "Link esterno",
            }),
            children: fields.array(
              fields.object({
                label: fields.text({
                  label: "Etichetta",
                  validation: { isRequired: true },
                }),
                path: fields.text({
                  label: "Percorso",
                  validation: { isRequired: true },
                }),
              }),
              {
                label: "Sottomenu",
                itemLabel: (props) => props.fields.label.value,
              }
            ),
          }),
          {
            label: "Voci della Navbar Header",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
      },
    }),
    impostazioni: singleton({
        label: "⚙️ Impostazioni",
        path: "src/content/settings",
        format: { data: "json" },
        schema: {
            nome: fields.text({
              label: "Nome del ristorante",
              validation: { isRequired: true },
              defaultValue: "Ristorante",
            }),
          copertina: fields.array(
            fields.object({
              src: fields.image({
                label: "Immagine",
                validation: { isRequired: true },
                directory: "src/assets/img/cms/copertina",
                publicPath: "/src/assets/img/cms/copertina",
              }),
              alt: fields.text({
                label: "Alt",
                description:"Inserisci il testo alternativo per l'immagine (per i non vedenti)",
                validation: { isRequired: true },
              }),
            }),
            {
              label: "Immagine di copertina",
              description:"inserisci un immagine o una serie d'immagini per la copertina del sito",
              itemLabel: (props) => props.fields.alt.value,
            }
          ),
          telefono: fields.text({
            label: "Telefono",
          }),
          email: fields.text({
            label: "Email",
          }),
          indirizzo: fields.text({
            label: "Indirizzo",
          }),
          facebook: fields.url({
              label: "Facebook",
          }),
          instagram: fields.url({
              label: "Instagram",
          }),
          tripadvisor: fields.url({
              label: "Tripadvisor",
          }),
          gmaps: fields.url({
              label: "Google Maps",
          }),
        },
      }),
  },
});
