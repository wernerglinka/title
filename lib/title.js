/**
 * @name TitleBlock
 * @description Title block with prefix, title and sub-title
 * @example <title-block prefix="just saying" title="Minneapolis" subtitle="The city of Lakes" headertag="h1"></title-block>
 * @param {string} prefix - comes before the title
 * @param {string} title
 * @param {string} headertag - h1, h2, h3, h4, h5, h6
 * @param {string} subtitle - goes right after the title
 */

class TitleBlock extends HTMLElement {
  
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
      <style>
        * {
          font-family: var(--font-family);
        }
        p {
          margin: 0;
        }
        p.prefix {
          font-size: 1rem;
          font-weight: 300;
          font-style: italic;
        }
        h1 {
          font-family: var(--font-family);
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 1rem;
        }
        .subtitle {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
      </style>
    `;

    // get all attributes
    this.allAttributes = this.getAttributeNames();
    // reflecting properties to attributes
    this.allAttributes.forEach((attribute) => {
      Object.defineProperty(this, attribute, {
        get() {
          return this.getAttribute(attribute);
        },
        set(value) {
          if (value) {
            this.setAttribute(attribute, value);
          } else {
            // for boolean attributes, the presence of the attribute represents true
            this.removeAttribute(attribute);
          }
        },
      });
    });
  }

  // component attributes
  static get observedAttributes() {
    return ['prefix', 'title','subtitle','headertag','titlelength', 'apstyle'];
  }
  
  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (!oldValue || oldValue === newValue) return;

    if (property === 'title') {
      const title = newValue;
      const titlelength = this.getAttribute('titlelength');
      const trimmedTitle = this.truncateAfterWord(title, titlelength);
      const apstyle = this.getAttribute('apstyle');
      this.shadowRoot.querySelector('.title').textContent = apstyle ? this.apStyleTitleCase(trimmedTitle) : trimmedTitle;
    }
    if (property === 'subtitle') {
      this.shadowRoot.querySelector('.subtitle').textContent = newValue;
    }
    if (property === 'prefix') {
      this.shadowRoot.querySelector('.prefix').textContent = newValue;
    }
    if (property === 'headertag') {
      const headertag = newValue;
      const title = this.shadowRoot.querySelector(oldValue);
      if (!title) return;
      const titleClasses = title.classList;
      const newTitle = document.createElement(headertag);
      newTitle.classList.add(...titleClasses);
      newTitle.textContent = title.textContent;
      title.replaceWith(newTitle);
    }
    if (property === 'titlelength') {
      const titlelength = newValue;
      const title = this.getAttribute('title');
      const trimmedTitle = this.truncateAfterWord(title, titlelength);
      const apstyle = this.getAttribute('apstyle');
      this.shadowRoot.querySelector('.title').textContent = apstyle === "yes" ? this.apStyleTitleCase(trimmedTitle) : trimmedTitle;
    }
    if (property === 'apstyle') {
      const apstyle = newValue;
      const titlelength = this.getAttribute('titlelength');
      const title = this.getAttribute('title');
      const trimmedTitle = this.truncateAfterWord(title, titlelength);
      this.shadowRoot.querySelector('.title').textContent = apstyle === "yes" ? this.apStyleTitleCase(trimmedTitle) : trimmedTitle;
    }
  }
  
  async connectedCallback() {
    const self = this;
    const prefix = self.getAttribute('prefix');
    const title = self.getAttribute('title');
    const subtitle = self.getAttribute('subtitle');
    const headertag = self.getAttribute('headertag');
    const titlelength = self.getAttribute('titlelength');
    const trimmedTitle = this.truncateAfterWord(title, titlelength);
    const apstyle = self.getAttribute('apstyle');

    /**
     * add prefix
     * Note: prefix is optional
     */ 
    if (prefix) {
      const titlePrefix = this.shadowRoot.appendChild(document.createElement('p'));
      titlePrefix.textContent = prefix;
      titlePrefix.classList.add('prefix');
    }

    /**
     * add title
     */
    const titleElement = this.shadowRoot.appendChild(document.createElement(headertag));
    titleElement.classList.add('title'); // need this class to change element attributes
    titleElement.textContent = apstyle === "yes" ? this.apStyleTitleCase(trimmedTitle) : trimmedTitle;

    /**
     * add subtitle
     * Note: subtitle is optional
     */
    if (subtitle) {
      const subtitleElement = this.shadowRoot.appendChild(document.createElement('p'));
      subtitleElement.textContent = subtitle;
      subtitleElement.classList.add('subtitle');
    }
  }

  truncateAfterWord (str, chars, placeholder = '…') {
    return str.length < chars ? str : `${str.substr( 0, str.substr(0, chars - placeholder.length).lastIndexOf(" "))}${placeholder}`;
  }

  capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  apStyleTitleCase(value) {
    if (!value) return ''

    const smallwords = 'a an and at but by for in nor of on or so the to up yet';
    const defaults = smallwords.split(' ');
  
    const stop = smallwords || defaults;
    const splitter = /(\s+|[-‑–—,:;!?()])/;
  
    return value
      .split(splitter)
      .map((word, index, all) => {
        // The splitter:
        if (index % 2) return word;
      
        const lower = word.toLowerCase();
  
        if (index !== 0 && index !== all.length - 1 && stop.includes(lower)) {
          return lower;
        }
  
        return this.capitalize(word);
      })
      .join('');
  }
}

// register component
customElements.define( 'title-block', TitleBlock );