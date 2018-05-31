var BENCHY = "https://www.thingiverse.com/download:1223854";
var helper = null;
var rotate = true;
var model = null;
var updateBox = true;
var scene = new THREE.Scene();
function start(){
    const WIDTH = 1200;
    const HEIGHT = 960;

    const VIEW_ANGLE = 45;
    const ASPECT = WIDTH /HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    const container =
        document.querySelector('#container');


    const renderer = new THREE.WebGLRenderer();
     camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );
        
    scene.add(camera);
    scene.add( new THREE.GridHelper(1000, 10));
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;
    var color = new THREE.Color('skyblue');
    scene.background = new THREE.Color(0xffffff);
    
    renderer.setSize(WIDTH, HEIGHT);
    stats = new Stats();
    container.appendChild(stats.dom);
    

    container.appendChild(renderer.domElement);
    loadStl(BENCHY);
    addLight(scene);
    var controls = new THREE.OrbitControls( camera );
    controls.enableDamping = true; 
	controls.dampingFactor = 0.25;

	controls.screenSpacePanning = false;

	controls.minDistance = 200;
	controls.maxDistance = 800

	controls.maxPolarAngle = Math.PI / 2;
    controls.update();
    
    requestAnimationFrame(function update () {//update scene
        stats.begin();
        if(helper && updateBox)
            helper.update();
        if(model && rotate){
            model.rotation.z += 180/3600;
        }
        

        controls.update();
        renderer.render(scene, camera);
        stats.end();
        
        requestAnimationFrame(update);
    });
}


function addLight(scene){
    scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
    const pointLight = new THREE.PointLight(0xFFFFFF);

    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 200;

    scene.add(pointLight);
}

function loadStl(path){
    if(path === undefined)path = BENCHY;
    if(model && helper){
        scene.remove(model);
        scene.remove(helper);

    }
    var material =
    new THREE.MeshLambertMaterial(
    {
        color: 0x0000ff
    });
    var loader = new THREE.STLLoader();
    loader.load(path, function (geometry) { 
        model = new THREE.Mesh(geometry, material);
        model.position.set(0.1, 0.1, 0.1);
        model.rotation.set(4.7, 0, 0);
        model.scale.set(1, 1, 1);

        model.castShadow = true;
        model.receiveShadow = true;
        
        helper = new THREE.BoxHelper (model, 0x0000ff);
        scene.add(model);
        scene.add(helper);
        console.log(path + " loaded")
    });
}



