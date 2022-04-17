import { PluginSimple } from "markdown-it";

const imageCaptionPlugin: PluginSimple = (md) => {
  const defaultImageRule = md.renderer.rules.image || ((tokens, idx, options, _, self) => self.renderToken(tokens, idx, options));
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const alt = token.content;

    return `
      <figure>
        ${defaultImageRule(tokens, idx, options, env, self)}
        <figcaption align="center">${alt}</figcaption>
      </figure>
    `;
  };
};

export default imageCaptionPlugin;
