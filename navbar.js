// DIGILOWEN Navbar Component

class NavbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                }

                nav {
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
                    transition: all 0.3s ease;
                }

                .nav-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 80px;
                }

                .logo {
                    font-size: 1.5rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* Basic nav styles */
                .nav-links {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                a {
                    color: #e6edf3;
                    text-decoration: none;
                    font-weight: 600;
                }
            </style>

            <nav>
                <div class="nav-container">
                    <div class="logo">DIGILOWEN</div>
                    <div class="nav-links">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
            </nav>
        `;
    }

    addEventListeners() {
        // Stub: add event listeners here if needed
    }
}

customElements.define('digilowen-navbar', NavbarComponent);