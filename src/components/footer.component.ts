export class Footer extends HTMLElement {
  rendered: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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

      :host {
        display: none;
      }

      .c-footer {
        max-width: 1400px;
        margin: 0 auto;
        padding: var(--24px);
        text-align: center;
      }
      
      .c-footer__social {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--40px);
        margin-top: var(--80px);
      }

      ::slotted(a[slot="link"]) {
        display: inline-block;
        font-size: var(--14px);
        color: var(--link-color);
        text-transform: uppercase;
        font-weight: 700;
        text-decoration: none;
        transition: color .5s;
        letter-spacing: 2px;
      }

      ::slotted(p[slot="copyright"]) {
        font-size: var(--12px);
        color: var(--link-color);
      }

      /* Responsive */
      @media screen and (max-width: 576px) {
        .c-footer__social {
          gap: var(--24px);
          flex-wrap: wrap;
        }
      }
    `;
  }

  get template(): string {
    return `
      <style>
        ${this.styled}
      </style>
      <footer class="c-footer">
        <div>
          <slot name="link"></slot>
        </div>
        <slot name="copyright"></slot>
        <div class="c-footer__social">
          <slot name="social-link"></slot>
        </div>
      </footer>
    `;
  }

  connectedCallback() {
    this.rendered = true;
  }

  render(): void {
    if (this.shadowRoot !== null) this.shadowRoot.innerHTML = this.template;
  }
}
