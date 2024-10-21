

export const registerFormControls = [
    {
        id: 1, name: "userName", label: "Username", placeholder: "Enter your name", componentType: "input", type: "text"
    },
    {
        id: 2, name: "email", label: "Email", placeholder: "Enter your email", componentType: "input", type: "email"
    },
    {
        id: 2, name: "password", label: "Password", placeholder: "Enter your password", componentType: "input", type: "password"
    }
]

export const initialRegisterData = {
    userName: "", email: "", password: ""
}

export const loginFormControls = [
    {
        id: 2, name: "email", label: "Email", placeholder: "Enter your email", componentType: "input", type: "email"
    },
    {
        id: 2, name: "password", label: "Password", placeholder: "Enter your password", componentType: "input", type: "password"
    }
]

export const initialLoginData = {
    email: "", password: ""
}


export const productFormControls = [
    {
        id: 1,
        name: "title",
        label: "Title",
        placeholder: "Enter product title",
        componentType: "input",
        type: "text"
    },
    {
        id: 2,
        name: "description",
        label: "Description",
        placeholder: "Enter product description",
        componentType: "textarea",
        type: "text"
    },
    {
        id: 3,
        name: "category",
        label: "Category",
        placeholder: "Select category",
        componentType: "select",
        options: [
            {
                id: "men", label: "Men"
            },
            {
                id: "women", label: "Women"
            },
            {
                id: "kids", label: "Kids"
            },
            {
                id: "accessories", label: "Accessories"
            },
            {
                id: "footwear", label: "Footwear"
            },

        ]
    },
    {
        id: 4,
        name: "brand",
        label: "Brand",
        placeholder: "Select brand",
        componentType: "select",
        options: [
            {
                id: "nike", label: "Nike"
            },
            {
                id: "puma", label: "Puma"
            },
            {
                id: "levi", label: "Levi's"
            },
            {
                id: "zara", label: "Zara"
            },
            {
                id: "h&m", label: "H&M"
            },

        ]
    },
    {
        id: 5,
        name: "price",
        label: "Price",
        placeholder: "Enter price",
        componentType: "input",
        type: "number"
    },
    {
        id: 6,
        name: "salePrice",
        label: "Sale Price",
        placeholder: "Enter sale price",
        componentType: "input",
        type: "number"
    },
    {
        id: 7,
        name: "totalStock",
        label: "Total Stock",
        placeholder: "Enter total stock",
        componentType: "input",
        type: "number"
    }
];

export const initialProductFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: 0,
    salePrice: 0,
    totalStock: 0
};

export const addressFormControls = [
    {
        id: 1,
        name: "address",
        label: "Address",
        placeholder: "Enter your address",
        componentType: "input",
        type: "text"
    },
    {
        id: 2,
        name: "city",
        label: "City",
        placeholder: "Enter your city",
        componentType: "input",
        type: "text"
    },
    {
        id: 3,
        name: "pincode",
        label: "Pincode",
        placeholder: "Enter your pincode",
        componentType: "input",
        type: "text"
    },
    {
        id: 4,
        name: "phoneNumber",
        label: "Phone",
        placeholder: "Enter your phone number",
        componentType: "input",
        type: "text"
    },
    {
        id: 5,
        name: "additionalNotes",
        label: "Notes",
        placeholder: "Enter additional notes",
        componentType: "textarea", // Assuming you want a textarea for notes
        type: "text"
    }
];

export const initialaddressFormData = {
    address: null,
    city: "",
    pincode: "",
    phoneNumber: "",
    name: "",
    additionalNotes:""
};




export const filtersOptions = {
    category: [
        {
            id: "men", label: "Men"
        },
        {
            id: "women", label: "Women"
        },
        {
            id: "kids", label: "Kids"
        },
        {
            id: "accessories", label: "Accessories"
        },
        {
            id: "footwear", label: "Footwear"
        },

    ],
    brand: [
        {
            id: "nike", label: "Nike"
        },
        {
            id: "puma", label: "Puma"
        },
        {
            id: "levi", label: "Levi's"
        },
        {
            id: "zara", label: "Zara"
        },
        {
            id: "h&m", label: "H&M"
        },
    ]
}

export const sortOptions = [
    { id: 'priceLowToHigh', label: 'Price Low To High' },
    { id: 'priceHighToLow', label: 'Price High To Low' },
    // { id: 'ratingHighToLow', label: 'Rating High To Low' },
    // { id: 'ratingLowToHigh', label: 'Rating Low To High' },
    // { id: 'newest', label: 'Newest First' },
    // { id: 'oldest', label: 'Oldest First' },
    { id: 'aToZ', label: 'A to Z' },
    { id: 'zToA', label: 'Z to A' }
];