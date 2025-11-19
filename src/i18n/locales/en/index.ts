import { common } from './common';
import { home } from './home';
import { services } from './services';
import { about } from './about';
import { contact } from './contact';
import { servicesOld } from './services-old';
import { freeZones } from './free-zones';

export const en = {
  ...common,
  ...home,
  ...services,
  ...servicesOld,
  ...freeZones,
  ...about,
  ...contact,
};
