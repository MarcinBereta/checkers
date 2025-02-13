class Pionek extends THREE.Mesh {

    constructor(x, y, z, tekstura) {
        super(x, y, z, tekstura) // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        if(tekstura!=0){
            this.geometry =  new THREE.CylinderGeometry( 5, 5, 30, 32 );
            if (tekstura == 1) {
                this.materials = new THREE.MeshBasicMaterial({
                    color: 0xffff00,
                    side: THREE.DoubleSide,
                    wireframe: false,
                    transparent: true,
                    map: new THREE.TextureLoader().load( 'wood.jpg') 
                });
                this.cone = new THREE.Mesh(this.geometry, this.materials);
                this.cone.name="Jeden"

            }
            if(tekstura==2) {
                this.materials = new THREE.MeshBasicMaterial({
                    color: 0x00ffff,
                    side: THREE.DoubleSide,
                    wireframe: false,
                    transparent: true,
                    map: new THREE.TextureLoader().load( 'wood.jpg') 
                });
                this.cone = new THREE.Mesh(this.geometry, this.materials);
                this.cone.name="Dwa"

            }
            if(tekstura==5){
                this.materials = new THREE.MeshBasicMaterial({
                    color: 0x0000ff,
                    side: THREE.DoubleSide,
                    wireframe: false,
                    transparent: true,
                    map: new THREE.TextureLoader().load( 'wood.jpg') 
                });
                this.cone = new THREE.Mesh(this.geometry, this.materials);
                this.cone.name="Dwa"
            }
            if(tekstura==7){
                this.materials = new THREE.MeshBasicMaterial({
                    color: 0x0000ff,
                    side: THREE.DoubleSide,
                    wireframe: false,
                    transparent: true,
                    map: new THREE.TextureLoader().load( 'wood.jpg') 
                });
                this.cone = new THREE.Mesh(this.geometry, this.materials);
                this.cone.name="Jeden"
            }
    
            (this.cone).position.set(x * 20, y, z * 20)
            return this.cone
        }    
    }
       
       
}
