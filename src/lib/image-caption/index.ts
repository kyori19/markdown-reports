import MarkdownIt, { PluginSimple } from "markdown-it";
import type Renderer from "markdown-it/lib/renderer";

const imageCaptionPlugin: PluginSimple = (md) => {
  extendImageRule(md, (defaultRule) => (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const alt = token.content;

    return `
      <figure>
        ${defaultRule(tokens, idx, options, env, self)}
        <figcaption align="center">${alt}</figcaption>
      </figure>
    `;
  });

  extendImageRule(md, (defaultRule) => (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const styles = token.attrGet('style')?.trim()?.split(';') || [];
    styles.push('display: block', 'margin: auto');
    token.attrSet('style', styles.join(';'));
    return defaultRule(tokens, idx, options, env, self);
  });
};

const extendImageRule = (md: MarkdownIt, customRule: (defaultRule: Renderer.RenderRule) => Renderer.RenderRule) => {
  const defaultRule = md.renderer.rules.image || ((tokens, idx, options, _, self) => self.renderToken(tokens, idx, options));
  md.renderer.rules.image = customRule(defaultRule);
};

export default imageCaptionPlugin;
