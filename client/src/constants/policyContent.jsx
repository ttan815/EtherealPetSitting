// dt28 text shown in the terms of service and privacy policy popups
// this wording still needs final approval from the business owner angelena
// a section can have body text, a list of items, or both

// holds both policies so the popup can look them up by name
/**
 * Static policy content shown during customer account creation.
 * @type {Object}
 */
export const POLICIES = {
  // terms of service popup content
  terms: {
    title: 'Terms of Service', // popup heading
    sections: [
      // deposit tiers based on how far ahead the booking is made
      {
        heading: 'Bookings and deposits',
        body: 'A deposit is required to confirm an appointment. The deposit depends on how far ahead the appointment is booked:',
        items: ['Within 30 days: $20', 'Within 60 days: $50', 'Within 90 days: $100'],
      },
      // general pricing note so the site does not promise exact fees
      {
        heading: 'Fees and charges',
        body: 'Deposit amounts, cancellation fees, and scheduling charges will be displayed during booking and are subject to the current policies approved by Ethereal Pet Sitting.',
      },
      // cancelling or moving an appointment
      {
        heading: 'Cancellations and rescheduling',
        body: 'Please reschedule or cancel as early as possible through your account so the schedule can be updated.',
      },
      // what the customer agrees to provide
      {
        heading: 'Pet and home information',
        body: 'You agree to provide accurate and up to date care instructions, health and medication details, home entry instructions, and emergency contacts.',
      },
      // keeping the account safe
      {
        heading: 'Your account',
        body: 'You are responsible for keeping your login information private and for activity on your account.',
      },
    ], // end of terms sections
  }, // end of terms

  // privacy policy popup content
  privacy: {
    title: 'Privacy Policy', // popup heading
    sections: [
      // everything the site may collect
      {
        heading: 'Information we collect',
        body: 'To provide pet care services, we may collect:',
        items: [
          'Your name, email, phone number, and address',
          'Emergency contacts',
          'Pet details, including veterinary information',
          'Medication and health details',
          'Feeding and walking instructions',
          'Home entry and key instructions',
          'Alarm and camera information',
          'Wi-Fi details, if you choose to provide them',
          'Payment and deposit records',
          'Reviews and account activity',
        ],
      },
      // why the information is collected
      {
        heading: 'How we use it',
        body: 'To schedule and confirm visits, care for your pets and home, process deposits and payments, and send appointment reminders, updates, and receipts.',
      },
      // who can see or process the information
      {
        heading: 'Who may access or process your information',
        body: 'We do not sell your information. It may be accessed or processed by:',
        items: [
          'The owner and authorized administrators',
          'Sitters assigned to your appointments',
          'MongoDB Atlas (data storage)',
          'DigitalOcean (website hosting)',
          'Stripe or another payment provider (payments and deposits)',
          'Twilio (text message notifications)',
          'Amazon SES (email notifications)',
        ],
      },
      // how to reach the business
      {
        heading: 'Contact',
        body: 'Questions? Email etherealpetsitting@gmail.com or call (510) 461-6392.',
      },
    ], // end of privacy sections
  }, // end of privacy
}; // end of policies
