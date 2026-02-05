import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    try {
        // Read query parameters
        const { region, season } = req.query;

        // Fetch data
        const regions = await getListOfRegions();
        const seasons = await getListOfSeasons();
        let routes = await getAllRoutes();

        // Filter routes
        if (region && region !== '') {
            routes = routes.filter(r => r.region === region);
        }

       if (season && season !== '') {
    routes = routes.filter(r => {
        // If season is an array, check if it includes the selected season
        if (Array.isArray(r.season)) {
            return r.season.includes(season);
        }
        // If season is a string, check equality
        return r.season === season;
    });
        }

        // Render the template with selected filters
        console.log('Filtered routes:', routes);
        res.render('routes/list', { 
            title: 'Scenic Train Routes',
            regions,
            seasons,
            routes,
            selectedRegion: region || '',
            selectedSeason: season || ''
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
