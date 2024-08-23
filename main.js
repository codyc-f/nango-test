import Nango from './node_modules/@nangohq/frontend/dist/index.js';

document.getElementById('connectButton').addEventListener('click', () => {
    const nango = new Nango({ publicKey: 'fbdf873c-7fa8-45f0-84d2-f914beee2817' });

    nango.auth('google-mail', 'test-connection-id')
        .then(async (result) => {
            const response = await fetch('http://localhost:3001/records');
            const data = await response.json();

            const emails = data.records;
            const emailContainer = document.getElementById('emails');

            emails.forEach(email => {
                const emailElement = document.createElement('div');
                emailElement.classList.add('email');

                emailElement.innerHTML = `
                    <h3>Subject: ${email.subject}</h3>
                    <p><strong>From:</strong> ${email.sender}</p>
                    <p><strong>To:</strong> ${email.recipients}</p>
                    <p><strong>Date:</strong> ${new Date(email.date).toLocaleString()}</p>
                    <p><strong>Body:</strong></p>
                    <p>${email.body}</p>
                `;

                emailContainer.appendChild(emailElement);
            });

        })
        .catch((err) => {
            document.getElementById('status').innerText = 'Error: ' + err.message;
        });
});
