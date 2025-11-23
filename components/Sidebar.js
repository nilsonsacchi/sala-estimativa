// components/Sidebar.js

import Link from 'next/link';
import React from 'react';

export default function Sidebar() {
    const links = [
        { name: '🏠 Home', href: '/' },
        { name: '🗑️ Apagar Salas', href: '/delete-rooms' }, // Link para a nova página
        // { name: '👥 Gerenciar Usuários', href: '/admin/users' }, // Exemplo de outro link
    ];

    return (
        <nav>
            <ul style={{
                listStyle: 'none',
                padding: '20px',
                margin: 0,
                width: '200px',
                height: '100vh',
                backgroundColor: '#f4f4f4',
                borderRight: '1px solid #ddd',
                boxSizing: 'border-box'
            }}>
                <li style={{ marginBottom: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
                    Menu de Navegação
                </li>
                {links.map((link) => (
                    <li key={link.name} style={{ marginBottom: '10px' }}>
                        <Link
                            href={link.href}
                            // O estilo que estava no <a> foi movido diretamente para o <Link>
                            style={{
                                textDecoration: 'none',
                                color: '#333',
                                display: 'block',
                                padding: '8px 0'
                            }}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}