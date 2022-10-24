import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ihotel } from '../models/hotel';

export class HotelData implements InMemoryDbService{
    createDb() : Record<string, Ihotel[]>{
      const hotels:Ihotel[] = [
        {
            id : 1,
            nomHotels : "Radisson Blu Hotels, Dakar Sea plaza",
            description : "belle ambiance les soirs avec les bougies et les senteurs...",
            prix : 119.727,
            imageUrl : "assets/img/radisson.PNG",
            rating : 3.5,
            tags : ['nouveau'] 
        }, {
            id : 2,
            nomHotels : "Jardin Savana Dakar",
            description : "emplacement charmant. plage privée. immense piscine et restaurant en front de mer. personnel très serviable",
            prix : 75.650,
            imageUrl : "assets/img/savanaJardin.PNG",
            rating : 5,
            tags : ['nouveau']
        }, {
            id : 3,
            nomHotels : "Terrou-Bi",
            description : "Face à la mer, le Terrou-Bi propose un hébergement contemporain, une connexion Wi-Fi gratuite, une piscine extérieure, un jardin bien entretenu avec des coins salon, un casino et une plage privée.",
            prix:  121.406,
            imageUrl : "assets/img/terrouBi.PNG",
            rating : 4,
            tags : ['nouveau']
        }, {
            id : 4,
            nomHotels : "Hotels Lagon 2",
            description : "Situé juste en face de la mer, l'Hotel Lagon 2 se trouve dans le centre de Dakar. Elle est gratuite. Very quiet location, the ocean view, the food",
            prix : 72.000,
            imageUrl : "assets/img/lagon2.PNG",
            rating : 2.5,
            tags : ['nouveau']
         }
      ];
      return { hotels }
    }
    genId(hotels:Ihotel[]) : number {
        return hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id + 1)) : 1;
    }
}