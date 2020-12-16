# Angular_8_Blog
Blog Básico con Angular 8 y Firebase

* **En caso de tener errores con la instalacion de versiones anteriores**
```
npm install -g npm@latest
npm cache clean --force
npm set audit false => opcional - Investigar
npm uninstall -g angular-cli
npm uninstall -g @angular/cli
npm install -g @angular/cli
npm cache clean --force
```

* **New Project**
```
ng new => Si ejecutamos solo esta linea de comandos, el CLI mostrara opciones.
ng new blog

ng new blog --style=scss --routing

ng new blog --routing  // Para que nos genere un módulo de ruta listo para funcionar

```
* **New Component**
```
ng generate component xyz
```
* **Angular Material**
```
ng add @angular/material
```
* **Add Dependency**
```
ng add _____
```
* **Run and Watch Tests**
```
ng test
```
* **Build for Production**
```
ng build --prod
```

# Creamos componentes & Rutas - Angular 8, Firebase, Angular Material
## Components
```
ng g module components/pages/home -m=app --route home     => Creamos un "módulo" estará en el módulo principal (-m=app indica en que módulo lo queremos - en el modulo "app" // --router home  => crea la ruta home al hacer la creación del módulo)

ng g c components/posts/new-post -m=app     => Creamos un "componente" que estará en el módulo principal.
ng g module components/posts/new-post -m=app => Solo crear un "módulo". (Sin rutas)

ng g module components/posts/list-posts -m=app --route posts    => general un componente para el listado de posts. (Componete que se mostrará en el apartado de admin donde se mostrará todos los posts. // Eliminar del routing)

ng g c components/posts/post => para mostrar el post single.


```
# Creamos Interface / Service - Angular 8 - #2

```
Crear ficheros de forma manual:

shared/models
file.interface.ts
post.interface.ts

Service:

ng g service components/posts/post --flat     => genera un service con la bandera --flat que no crea la capera.
```

# Instalación Angular Material con schematics - Angular 8 - #3

## Angular Material

* **Schematics**
```
Generador de código basado en plantillas, a través de un conjunto de instrucciones nos ayuda a generar código o paquetes para nuestros proyectos.

ng add @angular/material

Crear un módulo especifico para Angular Material:

ng g m material -m=app --flat

https://material.angular.io/guide/getting-started

Imagenes Random:
https://picsum.photos/

Extensión VSC:

Angular Material 2, Flex layout 1, Covalent 1 & Material icon snippets

```

# Comunicación entre componentes Angular - #4

```
4
```

# Angular material toolbar - Angular Material, Angular 8 - #5

```
CLI:

ng g @angular/material:material-nav (Crear el Toolbar mediante el CLI - No utilizado por el momento)

Manual:

ng g c shared/components/toolbar -m=material (Crear componente que sea parte del módulo de material)
ng g c shared/components/toolbar -m=app (Crear componente que sea parte del módulo principal - app)*

Page About:
ng g m components/pages/about -m=app --route about
```

# Configuramos Firebase - Firebase Console Angular 8 - #6

```
Project Name: Blog-Geo

Activar o Habilitar:

Autenticación por correo
Base de datos
Storage

Cambiar las reglas de seguridad:

Defaul:

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}

Cambio:

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}


Pendiente Habilidar Hosting:

AngularFire:

npm install firebase @angular/fire --save
npm install firebase --save
npm audit fix (if any vulnerabilities found else ignore)


Hosting CLI: (Pendiente)

ng add @angular/fire
firebase logout
firebase login

```

# REGLAS FIREBASE - GEO

```
Default:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

Si el user esta autenticado:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

Si es una colección especifica con su uid:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match / users /{id_user} {
      allow read, write: if request.auth.uid == id_user;
    }
  }
}


rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin(){
      return exists(/databases/$(database)/documents/admins/$request.auth.uid)
    }

    match / users /{id_user} {
      allow read;
      allow create, update: if request.auth.uid == id_user;
      allow delete: if isAdmin();
    }
  }
}


rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin(){
      return exists(/databases/$(database)/documents/admins/$request.auth.uid)
    }

    match / users /{id_user} {
      allow read;
      allow create, update: if request.auth.uid == id_user;
      allow delete: if isAdmin();
    }
  }
}

Comodin ** // Cualquier rama o cualquier colección que es dentro de users

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin(){
      return exists(/databases/$(database)/documents/admins/$request.auth.uid)
    }

    match / users /{document=**} {
      allow read;
      allow create, update: if request.auth.uid == id_user;
      allow delete: if isAdmin();
    }
  }
}

https://cloud.google.com/firestore/docs/security/get-started?hl=es-419

resource.data.published == true || request.auth.uid == resource.data.author;

Cloud Firestore Rules | Parte 1

https://www.youtube.com/watch?v=GLQ76DfRBDE

Login con google - gmail

Envia correos con Firebase Functions

https://www.youtube.com/watch?v=MeXLkNWTF_g


Login con Facebook y Firebase con https en localhost
https://www.youtube.com/watch?v=qI6E2lR5cDM

```

# Creamos métodos en el Services Angular 8 - Angular Material, Angular - #7

```
CRUD - GEO

  private postCollection: AngularFirestoreCollection<PostI>;
  private posts: Observable<PostI[]>;

  constructor(private db: AngularFirestore) { }

  getPosts() {
    this.postCollection = this.db.collection<PostI>('posts');
    const posts = this.postCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }; //operador de propagacion
        });
      }
    ));

    return posts;
  }

  getPost(id: string) {
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc<PostI>(id).valueChanges();
  }

  updatePost(id: string, post: PostI) {
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc(id).update(post);
  }

  setPost(post: PostI) {
    const id = this.db.createId();
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc(id).set({ ...post });
  }

  removePost(id) {
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc(id).delete();
  }

```

# Recuperar registro de Firebase - Angular Material Angular - #8

```
Consultar: Como se puede encapsular en un componente el loading


```

# Angular 8 Formulario de login (Reactive Form) - #9

```

ng g m components/admin -m=app --route admin (Crea un componente con un módulo independiente y un módulo para la ruta)

ng g m components/auth/login -m=app --route login
ng g service shared/services/auth                   (--spec=false)

```

# Creamos zona Admin - Angular Material - Angular 8 - #10

```
ng g c components/pages/container-app -m=app
ng g m components/admin/profile -m=app --route profile
```

# Angular Material Datatable con Angular 8 - #11

```
ng g c shared/components/table -m=app

```

# Angular material Datatable con Firebase - Angular 8 - #12 

```
Material Icons:

https://material.io/resources/icons/?style=baseline

```

# Sweetalert 2 & Angular Material Dialog - Angular 8 tutorial español - 13

```
Sweetalert2:

https://sweetalert2.github.io/

npm install sweetalert2

ng g c shared/components/modal -m=app

```

# Subir imagen & Guardar post en Firebase - Angular 8 tutorial - 14

```
None

```

# Editamos y guardamos en Firebase - Angular 8 tutorial Español - 15

```
Separar el componente para editar

ng g c components/posts/edit-post -m=app

Generar un Module:

ng g module components/posts/edit-post -m=app

```

# Modificar User Profile en Firebase - Angular 8 - 16

```
None -- ?
```


# 

```

```

# 

```

```

# 

```

```


# 

```

```


# 

```

```



* **script1.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at http://go.microsoft.com/fwlink/?LinkID=135170**

```
script1.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at http://go.microsoft.com/fwlink/?LinkID=135170

This error happens due to a security measure which won't let scripts be executed on your system without you having approved of it. You can do so by opening up a powershell with administrative rights (search for powershell in the main menu and select Run as administrator from the context menu) and entering:

        set-executionpolicy remotesigned
```
# Servicios inyectables en Angular
* **https://academia-binaria.com/servicios-inyectables-en-Angular/**

# Tutorial Angular Introducción
* **https://github.com/AcademiaBinaria/angular-basic**

# ¿Cómo implementar Lazy Loading en Angular?
* **https://medium.com/@HenryGBC/c%C3%B3mo-implementar-lazy-loading-en-angular-74b6e85d021f**
* **https://blog.ng-classroom.com/blog/angular/dominando_lazy_loading_en_angular/**

# Cómo usar Flexbox en Angular Material
* **https://www.belikesoftware.com/usar-flexbox-angular-material/**
* **https://stackoverflow.com/questions/43200545/create-a-responsive-toolbar-using-angular-material**

# Angular Opciones de CLI SASS

```

--------
Geo:

ng new My_New_Project --style=scss --routing
--------


ng new My_New_Project --style=sass 
ng new My_New_Project --style=scss

ng set defaults.styleExt sass
ng set defaults.styleExt scss

Actualización para Angular 6+

ng new sassy-project --style=scss
ng new sassy-project --style=sass

Actualizando proyecto existente

ng config schematics.@schematics/angular:component.styleext scss
ng config schematics.@schematics/angular:component.styleext sass

"schematics": {
    "@schematics/angular:component": {
        "styleext": "scss"
    }
} 


```

* **https://www.it-swarm.dev/es/angular/angular-opciones-de-cli-sass/823418252/**

# Angular 9/8 Firestore Database CRUD Tutorial

* **https://www.techiediaries.com/angular-firebase/angular-9-8-firestore-database-crud-tutorial/?fbclid=IwAR1wdlNjkSSSaCZys__Bbt0s6IoQJnDd31na_9Jl3UxmIotLbv2xsxQwRvs**


