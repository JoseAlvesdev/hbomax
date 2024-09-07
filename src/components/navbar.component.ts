export class NavBar extends HTMLElement {
  rendered: boolean = false;

  // DOMContentLoaded
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  get styled(): string {
    return `
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        vertical-align: baseline;
        list-style: none;
        border: 0;
        font-family: 'Raleway', sans-serif;
      }

      img {
        max-width: 100%;
      }

      :host {
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1;
        box-shadow: 1px 1px 8px 4px rgba(0, 0, 0, 0.1);
      }

      .c-navbar {
        display: flex;
        justify-content: space-between;
        background-color: var(--nav-bg-color);
        padding: var(--12px) var(--16px);
      }

      ::slotted(a) {
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        color: var(--text-color);
        text-transform: uppercase;
        font-size: var(--12px);
        font-weight: 700;
        line-height: var(--14px);
        letter-spacing: 2px;
      }

      ::slotted(a[slot="link"]) {
        border-radius: 500px;
        transition: background 1s, color 1s;
      }

      /* Responsive */
      @media screen and (max-width: 576px) {
        .c-navbar {
          flex-direction: column;
          gap: var(--16px);
          padding: var(--32px) var(--24px);
        }

        .c-navbar__left,
        .c-navbar__right {
          text-align: center;
        }
      }
    `;
  }

  get template(): string {
    return `
      <style>
        ${this.styled}
      </style>
      <nav class="c-navbar">
        <div class="c-navbar__left">
          <slot name="logo"></slot>
        </div>
        <div class="c-navbar__right">
          <slot name="sign-link"></slot>
          <slot name="link"></slot>
        </div>
      </nav>
    `;
  }

  connectedCallback(): void {
    this.rendered = true;
  }

  render(): void {
    if (this.shadowRoot !== null) this.shadowRoot.innerHTML = this.template;
  }
}