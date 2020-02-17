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
# Components
```
ng g module components/pages/home -m=app --route home     => Creamos un modulo estará en el módulo principal
ng g c components/posts/new-post -m=app     => Creamos un componente que estará en el módulo principal
ng g module components/posts/new-post -m=app
ng g module components/posts/list-posts -m=app --route posts
ng g c components/posts/post

ng g service components/posts/post --flat
```
# Angular Material

* **Schematics**
```
Generador de código basado en plantillas, a través de un conjunto de instrucciones nos ayuda a generar código o paquetes para nuestros proyectos.

ng add @angular/material

```

```
4
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
