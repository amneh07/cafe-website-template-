export type Category = "Hot Drinks" | "Cold Drinks" | "Pastries" | "Desserts";

export const categories: Category[] = ["Hot Drinks", "Cold Drinks", "Pastries", "Desserts"];

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    category: Category;
    image: string;
}

export const menuItems: MenuItem[] = [
    // paste your 16 items here, exactly as they are
    // Hot Drinks
    {
        id: "h1",
        name: "Classic Cappuccino",
        description: "Rich espresso topped with steamed milk foam and a dust of cocoa.",
        price: "$4.50",
        category: "Hot Drinks",
        image: "/images/menu/classic-cappuccino.jpg",
    },
    {
        id: "h2",
        name: "Caramel Latte",
        description: "Smooth espresso with steamed milk and house-made caramel syrup.",
        price: "$5.00",
        category: "Hot Drinks",
        image: "/images/menu/caramel-latte.jpg",
    },
    {
        id: "h3",
        name: "Single Origin Espresso",
        description: "A bold, concentrated shot sourced from our seasonal beans.",
        price: "$3.50",
        category: "Hot Drinks",
        image: "/images/menu/single-origin-espresso.jpg",
    },
    {
        id: "h4",
        name: "Spiced Chai Latte",
        description: "Black tea infused with warm spices and steamed milk.",
        price: "$4.75",
        category: "Hot Drinks",
        image: "/images/menu/spiced-chai-latte.jpg",
    },
    // Cold Drinks
    {
        id: "c1",
        name: "Iced Caramel Macchiato",
        description: "Espresso layered over cold milk with caramel drizzle.",
        price: "$5.25",
        category: "Cold Drinks",
        image: "/images/menu/iced-caramel-macchiato.jpg",
    },
    {
        id: "c2",
        name: "Cold Brew",
        description: "Slow-steeped for 18 hours, smooth and naturally sweet.",
        price: "$4.75",
        category: "Cold Drinks",
        image: "/images/menu/cold-brew.jpg",
    },
    {
        id: "c3",
        name: "Iced Matcha Latte",
        description: "Ceremonial grade matcha whisked with cold oat milk.",
        price: "$5.50",
        category: "Cold Drinks",
        image: "/images/menu/iced-matcha-latte.jpg",
    },
    {
        id: "c4",
        name: "Fresh Lemonade",
        description: "Hand-squeezed lemons with a hint of mint.",
        price: "$4.00",
        category: "Cold Drinks",
        image: "/images/menu/lemonade.jpg",
    },
    // Pastries
    {
        id: "p1",
        name: "Butter Croissant",
        description: "Flaky, golden, and baked fresh every morning.",
        price: "$3.25",
        category: "Pastries",
        image: "/images/menu/butter-croissant.jpg",
    },
    {
        id: "p2",
        name: "Almond Danish",
        description: "Soft pastry filled with almond cream and sliced almonds.",
        price: "$4.00",
        category: "Pastries",
        image: "/images/menu/almond-danish.jpg",
    },
    {
        id: "p3",
        name: "Cinnamon Roll",
        description: "Swirled with cinnamon sugar and topped with cream glaze.",
        price: "$4.25",
        category: "Pastries",
        image: "/images/menu/cinnamon-roll.jpg",
    },
    {
        id: "p4",
        name: "Blueberry Muffin",
        description: "Moist muffin loaded with fresh blueberries.",
        price: "$3.75",
        category: "Pastries",
        image: "/images/menu/blueberry-muffin.jpg",
    },
    // Desserts
    {
        id: "d1",
        name: "Chocolate Lava Cake",
        description: "Warm cake with a molten chocolate center.",
        price: "$6.50",
        category: "Desserts",
        image: "/images/menu/chocolate-lava-cake.jpg",
    },
    {
        id: "d2",
        name: "Classic Tiramisu",
        description: "Espresso-soaked layers with mascarpone cream.",
        price: "$6.00",
        category: "Desserts",
        image: "/images/menu/classic-tiramisu.jpg",
    },
    {
        id: "d3",
        name: "New York Cheesecake",
        description: "Rich and creamy, topped with a berry compote.",
        price: "$6.25",
        category: "Desserts",
        image: "/images/menu/cheesecake.jpg",
    },
    {
        id: "d4",
        name: "Pistachio Macarons",
        description: "Delicate shells with a smooth pistachio filling.",
        price: "$5.50",
        category: "Desserts",
        image: "/images/menu/pistachio-macarons.jpg",
    },
];