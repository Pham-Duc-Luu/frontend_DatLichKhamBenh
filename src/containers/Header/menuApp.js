export const adminMenu = [
    // {
    //     //hệ thống
    //     name: 'menu.system.header',
    //     menus: [
    //         {
    //             name: 'menu.system.system-administrator.header',
    //             subMenus: [
    //                 { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
    //                 { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
    //                 // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
    //             ],
    //         },
    //         // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    //     ],
    // },
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.manage-doctor',
                link: '/system/manage-doctor',
            },
            {
                name: 'menu.admin.manage-admin',
                link: '/system/manage-admin',
            },
            {
                name: 'menu.admin.crud',
                link: '/system/crud',
            },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-redux',
            },
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
        ],
    },
    {
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic',
            },
        ],
    },
    {
        name: 'menu.admin.specialist',
        menus: [
            {
                name: 'menu.admin.manage-specialist',
                link: '/system/manage-specialist',
            },
        ],
    },
    {
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook',
                link: '/system/manage-handbook',
            },
        ],
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
        ],
    },
];
