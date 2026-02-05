import { getRouteById, getSchedulesByRoute } from '../../models/model.js';
import { monthNumberToAbbr } from '../../includes/helpers.js';

export default async (req, res) => {
    const { routeId } = req.params;

    try {
        const route = await getRouteById(routeId);
        const schedules = await getSchedulesByRoute(routeId);

        // Create a SAFE copy of route data
        const details = {
            ...route,
            operatingMonths: Array.isArray(route.operatingMonths)
                ? route.operatingMonths.map(monthNumberToAbbr)
                : [],
            schedules
        };

        res.render('routes/details', {
            title: 'Route Details',
            details
        });

    } catch (err) {
        console.error('Error loading route details:', err);
        res.status(500).send('Server Error');
    }
};
