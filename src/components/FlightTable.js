import React from 'react'

function FlightTable() {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Airline
            </th>
            <th scope="col" class="px-6 py-3">
              Kalkış-Saat
            </th>
            <th scope="col" class="px-6 py-3">
              Varış-Saat
            </th>
            <th scope="col" class="px-6 py-3">
              Prcie
            </th>
            <th scope="col" class="px-6 py-3">
              Kalkı Tarihi
            </th>
            <th scope="col" class="px-6 py-3">
              Varış Tarihi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">Laptop</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FlightTable
