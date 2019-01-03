import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AgmCoreModule, MapsAPILoader, MouseEvent } from '@agm/core';
import { } from 'googlemaps';
import { Endereco } from '../models/endereco';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../services/pessoa/pessoa.service';
import { Pessoa } from '../models/pessoa';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  title: string = 'Endereço';
  lat: number = -22.788577054138884;
  lng: number = -43.30822798465579;
  zoom: number = 15;
  draggable: boolean = true;
  enderecoBusca: string;
  endereco: Endereco;
  pessoa: Pessoa = new Pessoa();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router) { }

  ngOnInit() {

    this.endereco = new Endereco();
    this.obterPessoa();

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

            
            for (let i = 0; i < place.address_components.length; i++) {

              if(place.address_components[i].types.find(x => x == "street_number")){
                this.endereco.numero = place.address_components[i].short_name;
              }

              if(place.address_components[i].types.find(x => x == "route")){
                this.endereco.logradouro = place.address_components[i].short_name;
              }

              if(place.address_components[i].types.find(x => x == "sublocality_level_1")){
                this.endereco.bairro = place.address_components[i].short_name;
              }

              if(place.address_components[i].types.find(x => x == "administrative_area_level_2")){
                this.endereco.cidade = place.address_components[i].short_name;
              }

              if(place.address_components[i].types.find(x => x == "administrative_area_level_1")){
                this.endereco.estado = place.address_components[i].short_name;
              }

              if(place.address_components[i].types.find(x => x == "country")){
                this.endereco.pais = place.address_components[i].long_name;
              }

              if(place.address_components[i].types.find(x => x == "postal_code")){
                this.endereco.cep = place.address_components[5].long_name;
              }
              
            }

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


  obterPessoa() : void {
    this.route.params
    .subscribe( params => {
      if(params.id){
        this.pessoaService
          .obterPessoa(params.id)
          .subscribe(pessoa => this.pessoa = pessoa);
      }
    });
  }

  voltar() : void {
    console.log("voltar");
    this.router.navigateByUrl('/admin/pessoa');
  }

}

 // just an interface for type safety.
 interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
