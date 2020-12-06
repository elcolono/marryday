import React from 'react';
import Link from 'next/link'
import { useUser } from '../utils/useUser.js';

export default function Dashboard() {

    const { user, logout } = useUser();

    if (!user) {
        return (
            <>
                <p>Hi there!</p>
                <p>
                    You are not signed in.{' '}
                    <Link href={'/auth'}>
                        <a>Sign in</a>
                    </Link>
                </p>
            </>
        )
    }

    return (
        <div>
            <div>
                <p>You're signed in. Email: {user.email}</p>
                <p
                    style={{
                        display: 'inline-block',
                        color: 'blue',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={() => logout()}
                >
                    Log out
        </p>
            </div>
            <div>
                <Link href={'/example'}>
                    <a>Another example page</a>
                </Link>
            </div>
            {/* {error && <div>Failed to fetch food!</div>}
            {data && !error ? (
                <div>Your favorite food is {data.food}.</div>
            ) : (
                    <div>Loading...</div>
                )} */}
        </div>
    )
}

// export async function getServerSideProps({ preview = false }) {
//     const { user, logout } = useUser();

//     return {
//         props: { user, logout },
//     }
// }
