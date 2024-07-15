import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { TexteditorComponent } from '../components/texteditor/texteditor.component';
import { FormComponent } from '../components/form/form.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { AddAccordionComponent } from '../components/add-accordion/add-accordion.component';
import { AddTabsComponent } from '../components/add-tabs/add-tabs.component';
import { BannerComponent } from '../components/banner/banner.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CardsComponent } from '../components/cards/cards.component';

export const componentMap: { [key: string]: { type: any; added?: boolean; editable?: boolean } } = {
  'header': { type: HeaderComponent, added: false, editable: true }, // Set editable as needed
  'footer': { type: FooterComponent, added: false, editable: true }, // Set editable as needed
  // 'texteditor': { type: TexteditorComponent, editable: true }, // Set editable as needed
  'form': { type: FormComponent, editable: true }, // Set editable as needed
  'carousel': { type: CarouselComponent, editable: true }, // Set editable as needed
  'accordion': { type: AddAccordionComponent, editable: true }, // Set editable as needed
  'tabs': { type: AddTabsComponent, editable: true }, // Set editable as needed
  'banner': { type: BannerComponent, editable: true},
  'navbar' : { type: NavbarComponent, editable: true},
  // 'cards':{type:CardsComponent,editable:true}
};

  