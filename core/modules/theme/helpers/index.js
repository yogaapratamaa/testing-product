/* eslint-disable import/prefer-default-export */
import { optionsOrder } from '@modules/theme/helpers/menuOrder';
import { optionsReturn } from '@modules/theme/helpers/menuReturn';
import { optionsShipment } from '@modules/theme/helpers/menuShipment';
// import { optionsDashboard } from '@modules/theme/helpers/menuDashboard';
// import { optionsPickPack } from '@modules/theme/helpers/menuPickPack';
// import { optionsCatalog } from '@modules/theme/helpers/menuCatalog';
// import { optionsInventory } from '@modules/theme/helpers/menuInventory';
// import { optionsMasters } from '@modules/theme/helpers/menuMasters';
// import { optionsMarketplace } from '@modules/theme/helpers/menuMarketplace';
// import { optionsIntegration } from '@modules/theme/helpers/menuIntegration';
// import { optionsVendor } from '@modules/theme/helpers/menuVendor';
// import { optionsTada } from '@modules/theme/helpers/menuTada';
// import { optionsReport } from '@modules/theme/helpers/menuReport';
// import { optionsConfigurations } from '@modules/theme/helpers/menuConfigurations';
// import { optionsTools } from '@modules/theme/helpers/menuTools';
// import { optionsUser } from '@modules/theme/helpers/menuUser';

export const helpersMenuList = () => [
    // ...optionsDashboard(t),
    ...optionsOrder(),
    // ...optionsPickPack(t),
    ...optionsShipment(),
    ...optionsReturn(),
    // ...optionsCatalog(t),
    // ...optionsInventory(t),
    // ...optionsMasters(t),
    // ...optionsMarketplace(t),
    // ...optionsIntegration(t),
    // ...optionsVendor(t),
    // ...optionsTada,
    // ...optionsReport(t),
    // ...optionsConfigurations(t),
    // ...optionsTools(t),
    // ...optionsUser(t),
];
