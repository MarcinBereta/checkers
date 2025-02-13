class Game {
    constructor() {

    }
    robkostki(datapion, szach, pionek, olddata) {
        var curr, pioncurr, deletepion;
        var intersects, intersects2;
        var scene = new THREE.Scene();
        var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D
        var camera = new THREE.PerspectiveCamera(
            45,
            window.innerHeight / window.innerWidth,
            0.1,
            10000
        );
        let oldpiondata;
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x0066ff);
        renderer.setSize(window.innerWidth, window.innerHeight);
        let rzad = [];
        let rzad2 = [];
        let szachownica = [];
        let pionki = [];
        let x = 1;
        $("#info").on("click", function () {
            if ($("#info2").css("display") == "none") {
                $("#info2").css("display", "block");
            } else {
                $("#info2").css("display", "none");
            }
        })
        if (szach == undefined) {
            for (let j = 0; j < 9; j++) {

                if (rzad.length > 0) {
                    szachownica.push(rzad)
                    pionki.push(rzad2)
                }
                rzad = [];
                rzad2 = []
                x++;
                for (let i = 0; i < 8; i++) {
                    if (x % 2 == 0) {
                        rzad.push(1)
                        rzad2.push(0)
                    }
                    else {
                        rzad.push(0)
                        rzad2.push(0)
                    }
                    x++;

                }
            }
        } else {
            console.log("PRZEROBIONO")
            pioncurr = pionek
            szachownica = szach;
        }
        // console.log(datapion)
        if (datapion == undefined) {
            for (let i = 0; i < 2; i++) {
                x++;
                for (let j = 0; j < 8; j++) {
                    if (x % 2 == 0) {
                        pionki[i][j] = 1;
                    }

                    x++;
                }
            }
            x = 2;
            for (let i = pionki.length - 2; i < pionki.length; i++) {
                x++;
                for (let j = 0; j < 8; j++) {
                    if (x % 2 == 0) {
                        pionki[i][j] = 2;
                    }
                    x++;
                }
            }
        }
        else {
            // console.log(datapion.obj)
            if (datapion.obj != undefined) {
                pionki = datapion.obj

            }
            else {
                pionki = datapion
            }

        }
        console.log(olddata)
        if (olddata != undefined) {
            console.log(olddata)
            console.log("SPIEDALAJ")
        }
        $("#info2").html("cos")
        var result = "<table border=1>";
        for (var i = 0; i < pionki.length; i++) {
            result += "<tr>";
            for (var j = 0; j < pionki[i].length; j++) {
                result += "<td>" + pionki[i][j] + "</td>";
            }
            result += "</tr>";
        }

        result += "</table>";
        $("#info").html(result)
        $("#root").off('mousedown').on("mousedown", function () {
            console.log("cos")
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                if ($("#login").text() == "Czekasz na drugiego gracza") {
                    curr = intersects[0].object
                    console.log(curr)

                    if (curr.name == "Dwa") {
                        szachownica = []
                        rzad = []
                        rzad2 = []
                        x = 1;
                        for (let j = 0; j < 9; j++) {

                            if (rzad.length > 0) {
                                szachownica.push(rzad)
                            }
                            rzad = [];
                            rzad2 = []
                            x++;
                            for (let i = 0; i < 8; i++) {
                                if (x % 2 == 0) {
                                    rzad.push(1)
                                    rzad2.push(0)
                                }
                                else {
                                    rzad.push(0)
                                    rzad2.push(0)
                                }
                                x++;

                            }
                        }
                        pioncurr = curr;
                        if (olddata != undefined) {
                            pionki[olddata.x][olddata.z] = 2;
                        }
                        pionki[pioncurr.position.x / 20][(pioncurr.position.z / 20)] = 5;
                        if (pionki[pioncurr.position.x / 20 - 1][(pioncurr.position.z / 20) - 1] == 0) {
                            szachownica[pioncurr.position.x / 20 - 1][(pioncurr.position.z / 20) - 1] = 3;
                        }
                        if (pionki[pioncurr.position.x / 20 - 1][(pioncurr.position.z / 20) - 1] == 1) {
                            if (pionki[pioncurr.position.x / 20 - 2][(pioncurr.position.z / 20) - 2] != 1) {
                                szachownica[pioncurr.position.x / 20 - 2][(pioncurr.position.z / 20) - 2] = 3;
                            }

                        }
                        if (pionki[pioncurr.position.x / 20 - 1][(pioncurr.position.z / 20) + 1] == 0) {
                            szachownica[pioncurr.position.x / 20 - 1][(pioncurr.position.z / 20) + 1] = 3;
                        }
                        if (pionki[pioncurr.position.x / 20 - 1][(pioncurr.position.z / 20) + 1] == 1) {
                            if (pionki[pioncurr.position.x / 20 - 2][(pioncurr.position.z / 20) + 2] != 1) {
                                szachownica[pioncurr.position.x / 20 - 2][(pioncurr.position.z / 20) + 2] = 3;
                            }

                        }
                        $("#root").html("")
                        oldpiondata = {
                            x: pioncurr.position.x / 20,
                            z: pioncurr.position.z / 20
                        }
                        game.robkostki(pionki, szachownica, pioncurr, oldpiondata)
                    }
                    if (curr.name == "ruch") {
                        console.log("COS DO RUCHU")

                        if (pioncurr != undefined) {
                            if (pioncurr.position.x - curr.position.x == +40) {
                                console.log("ZBIJANIE");
                                if (pioncurr.position.z - curr.position.z == -40) {
                                    pionki[pioncurr.position.x / 20 - 1][(pioncurr.position.z / 20) + 1] = 0;
                                } else {
                                    pionki[pioncurr.position.x / 20 - 1][(pioncurr.position.z / 20) - 1] = 0;
                                }
                            }
                            pionki[(pioncurr.position.x / 20)][(pioncurr.position.z / 20)] = 0;
                            pioncurr.position.x = curr.position.x
                            pioncurr.position.y = 20
                            pioncurr.position.z = curr.position.z
                            pionki[(curr.position.x / 20)][(curr.position.z / 20)] = 2
                            curr = null;
                            pioncurr = null;
                            net.update(pionki)
                            console.log("przenioslem")
                            ui.timer()
                            $("#wait").css("display", "block")
                        }
                    }

                }
                if ($("#login").text() != "Czekasz na drugiego gracza") {
                    curr = intersects[0].object
                    console.log(curr)
                    if (curr.name == "Jeden") {
                        szachownica = []
                        rzad = []
                        rzad2 = []
                        x = 1;
                        for (let j = 0; j < 9; j++) {

                            if (rzad.length > 0) {
                                szachownica.push(rzad)
                            }
                            rzad = [];
                            rzad2 = []
                            x++;
                            for (let i = 0; i < 8; i++) {
                                if (x % 2 == 0) {
                                    rzad.push(1)
                                    rzad2.push(0)
                                }
                                else {
                                    rzad.push(0)
                                    rzad2.push(0)
                                }
                                x++;

                            }
                        }
                        pioncurr = curr;
                        if (olddata != undefined) {
                            pionki[olddata.x][olddata.z] = 1;
                        }
                        pionki[pioncurr.position.x / 20][(pioncurr.position.z / 20)] = 7;

                        if (pionki[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) - 1] == 0) {
                            szachownica[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) - 1] = 3;
                        }
                        if (pionki[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) - 1] == 2) {
                            if (pionki[pioncurr.position.x / 20 + 2][(pioncurr.position.z / 20) - 2] != 2) {
                                szachownica[pioncurr.position.x / 20 + 2][(pioncurr.position.z / 20) - 2] = 3;
                            }
                        }
                        if (pionki[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) + 1] == 0) {
                            szachownica[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) + 1] = 3;
                        }
                        if (pionki[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) + 1] == 2) {
                            if (pionki[pioncurr.position.x / 20 + 2][(pioncurr.position.z / 20) + 2] != 2) {
                                szachownica[pioncurr.position.x / 20 + 2][(pioncurr.position.z / 20) + 2] = 3;
                            }
                        }
                        $("#root").html("")
                        oldpiondata = {
                            x: pioncurr.position.x / 20,
                            z: pioncurr.position.z / 20
                        }
                        game.robkostki(pionki, szachownica, pioncurr, oldpiondata)
                    }
                    if (curr.name == "ruch") {

                        if (pioncurr != undefined) {
                            console.log(pionki[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) - 1])
                            console.log(pionki[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) + 1])
                            console.log(pioncurr.position.x - curr.position.x)
                            if (pioncurr.position.x - curr.position.x == -40) {
                                console.log("ZBIJANIE");
                                if (pioncurr.position.z - curr.position.z == -40) {
                                    pionki[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) + 1] = 0;
                                } else {
                                    pionki[pioncurr.position.x / 20 + 1][(pioncurr.position.z / 20) - 1] = 0;
                                }
                            }

                            pionki[(pioncurr.position.x / 20)][(pioncurr.position.z / 20)] = 0;
                            pioncurr.position.x = curr.position.x
                            pioncurr.position.y = 20
                            pioncurr.position.z = curr.position.z
                            pionki[(curr.position.x / 20)][(curr.position.z / 20)] = 1
                            curr = null;
                            pioncurr = null;
                            console.log("przenioslem")
                            net.update(pionki)
                            ui.timer()
                            $("#wait").css("display", "block")
                        }
                    }

                }

            }

        })



        let q = 0;
        x = 0;
        var container = new THREE.Object3D() // kontener na obiekty 3D
        var container2 = new THREE.Object3D() // kontener na obiekty 3D
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                var cube = game.Rendering(i, 0, j, szachownica[i][j]);
                scene.add(cube);
                if (pionki[i][j] != 0 && pionki[i][j] != undefined) {
                    var cone = new Pionek(i, 20, j, pionki[i][j])
                    scene.add(cone);

                    //   console.log(cone)
                }


                q++


            }
        }
        intersects = raycaster.intersectObjects(container)
        intersects2 = raycaster.intersectObjects(container2)
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)
        $("#root").append(renderer.domElement);
        if ($("#login").text() == "Czekasz na drugiego gracza") {
            camera.position.set(400, 450, 75)
            camera.lookAt(0, 0, 75);
        }
        else {
            camera.position.set(-250, 450, 65)
            camera.lookAt(0, 0, 65);

        }
        function render() {


            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        render();
    }
    Rendering(x, y, z, tekstura) {
        this.geometry = new THREE.BoxGeometry(20, 20, 20);
        if (tekstura == 0) {
            this.materials = new THREE.MeshBasicMaterial({
                color: 0xff00ff,
                side: THREE.DoubleSide,
                wireframe: false,
                transparent: true,
                map: new THREE.TextureLoader().load( 'wood.jpg') 
            });
            this.cubes = new THREE.Mesh(this.geometry, this.materials);
            this.cubes.name = "inne";
        }
        if (tekstura == 1) {
            this.materials = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                wireframe: false,
                transparent: true,
                map: new THREE.TextureLoader().load( 'wood.jpg') 
            });
            this.cubes = new THREE.Mesh(this.geometry, this.materials);
            this.cubes.name = "biale";
        }
        if (tekstura == 3) {
            this.materials = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                side: THREE.DoubleSide,
                wireframe: false,
                transparent: true,
                map: new THREE.TextureLoader().load( 'wood.jpg') 
            });
            this.cubes = new THREE.Mesh(this.geometry, this.materials);
            this.cubes.name = "ruch";
        }

        (this.cubes).position.set(x * 20, y, z * 20)
        return this.cubes
    }


}