const customers = [
    {
        id: 1,
        firstName: "Tony",
        lastName: "T.",
        name: "Tony T.",
        initials: "TT",
        role: "Customer",
        since: "March 2026",
        visits: 6,
        phone: "(510) 555-0142",
        email: "tony.t@email.com",
        address: "1450 Maple Ave, Apt 3B",
        homeAccessNote: "Side gate code is 4821. Spare key is in the lockbox by the back door. Please lock the deadbolt when you leave.",
        tasks: [
            { id: "mail", label: "Bring in the mail", checked: false },
            { id: "plants", label: "Water the plants on the patio", checked: false },
            { id: "porch-light", label: "Turn on the porch light after 6 PM", checked: false },
        ],
        pets: [
            {
                id: 101,
                name: "Oreo",
                breed: "Tuxedo Cat",
                age: "5 years old",
                weight: "11 lb",
                allergies: "Chicken",
                medications: "Allergy tablet - 1 daily at 1:00 PM, given with food.",
                diet: "1 cup dry food twice a day (8 AM and 6 PM). No table scraps.",
                careNotes: "Nervous around loud noises. Loves the red ball and gentle head scratches.",
                vetName: "Maple Street Animal Hospital",
                vetPhone: "(510) 555-0199",
            },
        ],
    },
    {
        id: 2,
        firstName: "Wilson",
        lastName: "E.",
        name: "Wilson E.",
        initials: "WE",
        role: "Customer",
        since: "June 2025",
        visits: 12,
        phone: "(510) 555-0182",
        email: "wilson.e@email.com",
        address: "220 Oak Street",
        homeAccessNote: "Use the side entrance. Please make sure the gate is latched.",
        tasks: [
            { id: "plants", label: "Water the indoor plants", checked: false },
            { id: "package", label: "Bring packages inside", checked: true },
        ],
        pets: [
            {
                id: 201,
                name: "Void",
                breed: "Black Cat",
                age: "3 years old",
                weight: "10 lb",
                allergies: "None known",
                medications: "No medication required.",
                diet: "Half a cup of dry food in the morning and evening.",
                careNotes: "Likes quiet spaces and feather toys.",
                vetName: "Oakside Veterinary Clinic",
                vetPhone: "(510) 555-0145",
            },
            {
                id: 202,
                name: "Shadow",
                breed: "Domestic Shorthair",
                age: "2 years old",
                weight: "9 lb",
                allergies: "Fish",
                medications: "No medication required.",
                diet: "One wet food pouch each evening.",
                careNotes: "Shy at first; let Shadow approach you.",
                vetName: "Oakside Veterinary Clinic",
                vetPhone: "(510) 555-0145",
            },
        ],
    },
    {
        id: 3,
        firstName: "Bob",
        lastName: "T.",
        name: "Bob T.",
        initials: "BT",
        role: "Customer",
        since: "January 2026",
        visits: 4,
        phone: "(510) 555-0166",
        email: "bob.t@email.com",
        address: "88 Cedar Lane",
        homeAccessNote: "The key is in the lockbox beside the front door.",
        tasks: [
            { id: "curtains", label: "Close the living room curtains before leaving", checked: false },
        ],
        pets: [
            {
                id: 301,
                name: "Orange",
                breed: "Orange Tabby",
                age: "7 years old",
                weight: "12 lb",
                allergies: "None known",
                medications: "Daily vitamin with breakfast.",
                diet: "One scoop of dry food each morning.",
                careNotes: "Enjoys sunbathing by the window.",
                vetName: "Cedar Lane Animal Care",
                vetPhone: "(510) 555-0111",
            },
        ],
    },
    {
        id: 4,
        firstName: "Cathleen",
        lastName: "T.",
        name: "Cathleen T.",
        initials: "CT",
        role: "Customer",
        since: "October 2025",
        visits: 9,
        phone: "(510) 555-0173",
        email: "cathleen.t@email.com",
        address: "14 Birch Court",
        homeAccessNote: "Please use the front door. The porch light switch is inside.",
        tasks: [
            { id: "porch-light", label: "Turn on the porch light at dusk", checked: false },
        ],
        pets: [
            {
                id: 401,
                name: "Bean",
                breed: "Tuxedo Cat",
                age: "4 years old",
                weight: "10 lb",
                allergies: "Chicken",
                medications: "No medication required.",
                diet: "Sensitive-stomach food, one scoop twice a day.",
                careNotes: "Likes to play with the blue ribbon.",
                vetName: "Birch Court Veterinary",
                vetPhone: "(510) 555-0126",
            },
        ],
    },
];

function clonePet(pet) {
    return { ...pet };
}

function cloneCustomer(customer) {
    return {
        ...customer,
        tasks: customer.tasks.map((task) => ({ ...task })),
        pets: customer.pets.map(clonePet),
    };
}

/**
 * Fetches temporary customer records matching the customer or pet search query.
 * @param {string} query Search text.
 * @returns {Object[]} Matching customer records.
 */
export function getCustomers(query = "") {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return customers
        .filter((customer) => {
            const searchableText = [
                customer.name,
                ...customer.pets.flatMap((pet) => [pet.name, pet.breed]),
            ].join(" ").toLocaleLowerCase();
            return searchableText.includes(normalizedQuery);
        })
        .map(cloneCustomer);
}

/**
 * Fetches one temporary customer record by ID.
 * @param {number|string} id Customer ID.
 * @returns {Object|null} The matching customer, or null when it is not found.
 */
export function getCustomerById(id) {
    const customer = customers.find((item) => String(item.id) === String(id));
    return customer ? cloneCustomer(customer) : null;
}

/**
 * Updates a temporary customer record.
 * @param {number|string} id Customer ID.
 * @param {Object} data Customer fields to update.
 * @returns {Object|null} The updated customer, or null when it is not found.
 */
export function updateCustomer(id, data) {
    const customer = customers.find((item) => String(item.id) === String(id));
    if (!customer) {
        return null;
    }

    const firstName = String(data.firstName ?? customer.firstName).trim();
    const lastName = String(data.lastName ?? customer.lastName).trim();
    if (!firstName || !lastName) {
        return null;
    }

    Object.assign(customer, data, { firstName, lastName });
    customer.name = `${customer.firstName} ${customer.lastName}`.trim();
    customer.initials = `${customer.firstName[0] || ""}${customer.lastName[0] || ""}`.toUpperCase();
    return cloneCustomer(customer);
}

/**
 * Deletes a temporary customer record.
 * @param {number|string} id Customer ID.
 * @returns {boolean} Whether a customer was deleted.
 */
export function deleteCustomer(id) {
    const index = customers.findIndex((customer) => String(customer.id) === String(id));
    if (index < 0) {
        return false;
    }
    customers.splice(index, 1);
    return true;
}

/**
 * Updates a temporary extra-task checkbox value for a customer.
 * @param {number|string} customerId Customer ID.
 * @param {number|string} taskId Extra-task ID.
 * @param {boolean} checked New checkbox state.
 * @returns {Object|null} The updated customer, or null when the customer/task is not found.
 */
export function toggleExtraTask(customerId, taskId, checked) {
    const customer = customers.find((item) => String(item.id) === String(customerId));
    const task = customer?.tasks.find((item) => String(item.id) === String(taskId));
    if (!customer || !task) {
        return null;
    }
    task.checked = checked;
    return cloneCustomer(customer);
}

/**
 * Fetches all temporary pets belonging to a customer.
 * @param {number|string} customerId Customer ID.
 * @returns {Object[]} The customer's pets, or an empty array when the customer is not found.
 */
export function getPetsByCustomer(customerId) {
    const customer = customers.find((item) => String(item.id) === String(customerId));
    return customer ? customer.pets.map(clonePet) : [];
}

/**
 * Adds a temporary pet record to a customer.
 * @param {number|string} customerId Customer ID.
 * @param {{name: string, breed: string}} pet New pet details.
 * @returns {Object|null} The updated customer, or null when the customer is not found.
 */
export function addPetToCustomer(customerId, pet) {
    const customer = customers.find((item) => String(item.id) === String(customerId));
    if (!customer) {
        return null;
    }

    customer.pets.push({
        id: `pet-${customerId}-${Date.now()}`,
        name: pet.name.trim(),
        breed: pet.breed.trim(),
        age: "Age not provided",
        weight: "Weight not provided",
        allergies: "Not provided",
        medications: "No medication information provided.",
        diet: "No diet information provided.",
        careNotes: "No care notes provided.",
        vetName: "Not provided",
        vetPhone: "",
    });
    return cloneCustomer(customer);
}
