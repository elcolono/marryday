import React from 'react';
import { Table } from 'reactstrap';

import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

const WEEKDAYS = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
]


function OpeningHoursTable(props) {

    const {openingHours} = props;

    return (
        <Table className="text-sm mb-0">
            <tbody>
                {map(WEEKDAYS, (item, index) => (
                    <tr key={index}>
                        <th
                            className={`pl-0 ${index === 0 ? "border-0" : ""
                                }`}
                        >
                            {item}
                        </th>
                        <td
                            className={`pr-0 text-right ${index === 0 ? "border-0" : ""
                                }`}
                        >
                            {!isEmpty(find(openingHours, ['open.day', 0])) ? <div>24 Stunden geöffnet</div> : renderOpeningHours(map(find(openingHours, ['open.day', index + 1])))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const renderOpeningHours = (openingHours) => {
    if (isEmpty(openingHours)) {
        return <div>Geschlossen</div>
    } else {
        const openTime = `${openingHours[0].time.slice(0, 2)}:${openingHours[0].time.slice(2)}`
        const closeTime = `${openingHours[1].time.slice(0, 2)}:${openingHours[1].time.slice(2)}`
        return <div>{openTime} - {closeTime}</div>
    }
}

export default OpeningHoursTable;