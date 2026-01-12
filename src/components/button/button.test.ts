import './index.js';
import { expect, fixture, html } from '@open-wc/testing';
import { MyButton } from './index.js';

describe('MyButton', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<MyButton>(
        html`<my-button>My Button</my-button>`,
      );
      await expect(el).to.be.accessible();
    });

    it('variations are accessible', async () => {
      const el = await fixture<MyButton>(html`
        <my-button variation="primary">My Button</my-button>
        <my-button variation="hollow">My Button</my-button>
        <my-button variation="transparent">My Button</my-button>
      `);
      await expect(el).to.be.accessible();
    });

    it('disabled is accessible', async () => {
      const el = await fixture<MyButton>(
        html`<my-button disabled>My Button</my-button>`,
      );
      const button = el.shadowRoot?.querySelector('button');

      await expect(el).to.be.accessible();
      await expect(button?.hasAttribute('disabled')).to.be.true;
    });
  });
});
