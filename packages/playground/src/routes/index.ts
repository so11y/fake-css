export default [
	{
		path: '/style',
		name: 'style',
		component: () => import('../page/style.vue')
	},
    {
		path: '/class',
		name: 'class',
		component: () => import('../page/class.vue')
	},
    {
		path: '/dynamic',
		name: 'dynamic',
		component: () => import('../page/dynamic.vue')
	},
    {
		path: '/apply',
		name: 'apply',
		component: () => import('../page/apply.vue')
	},
    {
		path: '/module',
		name: 'module',
		component: () => import('../page/module.vue')
	},
    {
		path: '/patch',
		name: 'patch',
		component: () => import('../page/patch.vue')
	},
];
