# Clear Explain

**Ayuda a un LLM a elegir la forma más simple y útil de explicar algo.**

[English](README.md)

[Probar la demo online](https://lquevedo-oss.github.io/clear-explain/)

La skill combina escritura inspirada en ASD-STE100, diagramas explicativos y HTML
interactivo. Elige según lo que necesitas comprender: una respuesta breve para
una pregunta simple, un diagrama para un proceso con decisiones y una página
interactiva para explorar qué cambia al modificar una variable.

La idea viene del post de Andrej Karpathy compartido por el autor del proyecto:
crear artefactos a medida para comprender mejor los resultados de los LLM.
Las instrucciones y los ejemplos son originales. No existe afiliación con
Karpathy, ASD ni STEMG.

## Uso

```text
Usa $clear-explain para explicarme cómo crece una cola de trabajo.
Soy principiante. Elige un formato útil y responde en español.
```

```text
Usa $clear-explain para convertir este procedimiento en un diagrama de flujo.
Conserva las condiciones, las excepciones y las rutas de error: [procedimiento]
```

```text
Usa $clear-explain para crear un HTML que explique [tema].
Quiero cambiar [variable] y ver qué ocurre con [resultado].
Debe funcionar sin internet y mostrar sus supuestos.
```

## Instalación

Descarga el repositorio o clónalo:

```sh
git clone https://github.com/lquevedo-oss/clear-explain.git
cd clear-explain
```

Copia la carpeta completa [`skills/clear-explain`](skills/clear-explain) al directorio
de skills de tu agente. En una instalación local estándar de Codex es
`~/.codex/skills`, o el directorio `skills` dentro de `CODEX_HOME` si lo configuraste.
El [README en inglés](README.md#install-as-a-skill) incluye comandos para Windows,
macOS y Linux que evitan reemplazar una skill existente.

Invócala como `$clear-explain` si el agente admite skills con nombre. La detección
y recarga dependen del entorno. En otros agentes, sigue su mecanismo de skills.
Si no admiten skills, proporciona `SKILL.md` y la referencia pertinente como
instrucciones o contexto, manteniendo accesibles los archivos enlazados.

No requiere una API key. La creación y vista previa de artefactos dependen de las
herramientas del agente. La skill no instala paquetes ni publica contenido.

## Ejemplos

Un mismo tema, una cola de trabajo, en tres formatos:

- [Texto claro](examples/work-queue.md).
- [Flujo Mermaid](examples/work-queue.mmd).
- [HTML interactivo](examples/work-queue.html): ábrelo en un navegador, cambia las
  tareas que llegan y la capacidad, y avanza paso a paso.

Los ejemplos usan un modelo ilustrativo con supuestos explícitos. No son una
recomendación sobre dotación de personal. Los [casos de evaluación](evals/cases.md)
permiten revisar decisiones de formato y fidelidad, sin prometer resultados de
un benchmark que no se ha ejecutado. El [registro de verificación](evals/verification.md)
detalla las comprobaciones realizadas y sus límites.

## Relación con ASD-STE100

La skill aplica principios de claridad. **No certifica el cumplimiento de
ASD-STE100**, ni contiene el estándar completo o su diccionario. El estándar formal
es para inglés; en español aplicamos un estilo inspirado en sus principios.
"80 % STE" describe una preferencia de estilo, no una medida de cumplimiento.
[FAQ oficial](https://www.asd-ste100.org/STE_faq.html).

Para trabajos formales se necesita el estándar aplicable, la terminología del
dominio y revisión adecuada. Una respuesta convincente de IA no demuestra
cumplimiento. [Estándar y orientación sobre IA](https://asd-ste100.org/STE_downloads.html).

## Colaborar y publicar

Para proponer una mejora, incluye un prompt reproducible, el agente y herramientas
utilizados y el problema observado. Usa ejemplos ficticios o sin datos privados.
El material original se distribuye con [licencia MIT](LICENSE).

Puedes crear un repositorio `clear-explain` en tu cuenta de GitHub y subir el
contenido de esta carpeta. El [README](README.md#publish-your-copy-on-github)
incluye los comandos. La creación del repositorio y la autenticación se realizan
por separado.
