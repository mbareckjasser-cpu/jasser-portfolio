import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../src/components/Navbar"; // Assure-toi d'importer ton composant Navbar

// Mock pour window.scrollY
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0
});

describe("Navbar", () => {
  test("ajoute la classe 'shadow-lg' après le défilement", () => {
    // Rendre le composant Navbar
    render(<Navbar />);

    // Simuler un défilement
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    // Vérifier si la classe 'shadow-lg' est ajoutée
    const navbar = screen.getByRole("navigation");
    expect(navbar).toHaveClass("shadow-lg");
  });
});
