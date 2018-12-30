import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AgmCoreModule, MapsAPILoader, MouseEvent } from '@agm/core';
import { } from 'googlemaps';
import { Endereco } from '../models/endereco';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  title: string = 'Endereço';
  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom: number = 15;
  draggable: boolean = true;
  enderecoBusca: string;
  endereco: Endereco;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {

    this.endereco = new Endereco();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          if( place.address_components ) {
            this.endereco.logradouro = place.address_components[0].long_name;
            this.endereco.bairro = place.address_components[1].long_name;
            this.endereco.cidade = place.address_components[2].long_name;
            this.endereco.estado = place.address_components[3].short_name;
            this.endereco.pais = place.address_components[4].long_name;
            this.endereco.cep = place.address_components[5].long_name;
            this.endereco.lat = place.geometry.location.lat();
            this.endereco.lng = place.geometry.location.lng();
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }

  markerDragEnd($event: MouseEvent) {
    if( $event ) {
      this.endereco.lat = $event.coords.lat;
      this.endereco.lng = $event.coords.lng;
    }
  }

}

 // just an interface for type safety.
 interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
