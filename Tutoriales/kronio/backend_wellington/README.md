# Kronio BackEnd

Kronio es un sistema destinado a la gestión de recursos humanos.

Este repositorio contiene el código del backend de la aplicación, y utiliza o implementa principalmente las siguientes tecnologías:

- Node.js, como motor de ejecución.
- Typescript, como lenguaje principal.
- Nest.js, un framefork Typescript para aplicaciones de servidor basado en Express.js.
- PostgreSQL, base de datos objeto-relacional.
- TypeORM, como mapeador objeto-relacional, para trabajar con la base de datos.

---

## Descargar este repositorio

Para trabajar con este repositorio debe seguir los siguientes pasos:

1. Debe hacer un **fork** del projecto, al cual en este ejemplo llamaremos <kronio_backend_fork>, puede obtener mas información de como realizar un fork en el siguiente [enlace](https://confluence.atlassian.com/bitbucket/forking-a-repository-221449527.html).
2. Para comenzar a contribuir con el código debe trabajar de manera *local* con su repositorio <kronio_backend_fork>, por lo que debera **clonarlo localmente**. Le proponemos dos maneras de realizar: por consola y por aplicacion. En adelante mantendremos el orden de dar dos opciones siguiente el orden respectivamente.

	2.1 Por medio de la linea de comandos, escriba lo siguiente, el <username> depende de su cuenta.

	```
		git clone https://<username>@bitbucket.org/<username>/kronio-backend-fork.git
	```

	2.2 Utilice una aplicación con interfaz grafica: **Sourcetree**, que también le será útil los siguientes pasos. Puede descargar la aplicación desde el siguiente [enlace](https://www.sourcetreeapp.com/?utm_source=internal&utm_medium=enlace&utm_campaign=clone_repo_win). Para clonar el repositorio puede guiarse de la siguiente [página](https://confluence.atlassian.com/sourcetreekb/changing-remote-repository-path-on-sourcetree-using-git-or-mercurial-785616227.html).

3. En su repositorio local debe configurar sus **repositorios remotos**, que son el original y el fork <kronio_backend_fork>. Puede guiarse de los siguientes enlaces:

	3.1 Consola [enlace](https://confluence.atlassian.com/bitbucket/change-the-remote-url-to-your-repository-794212774.html).

	3.2 En Sourcetree [enlace](https://confluence.atlassian.com/sourcetreekb/changing-remote-repository-path-on-sourcetree-using-git-or-mercurial-785616227.html).

4. **Actualice su información** local en base a los repositorios remotos.

	4.1 Consola:

	```
		git -c diff.mnemonicprefix=false -c core.quotepath=false --no-optional-locks fetch --prune --tags fork
		git -c diff.mnemonicprefix=false -c core.quotepath=false --no-optional-locks fetch --prune --tags origin
	```

	4.2 En Sourcetree, por medio del boton "Fetch" y selecione para actualizar todas las etiquetas de todos los remotos.

5. **Actualice su código** de ser necesario haciendo un "Pull". Revise el siguiente [enlace](https://www.atlassian.com/git/tutorials/syncing/git-pull) para mas información.

Despues de seguir estos pasos tendrá el repositorio de forma local y remota en un fork para poder trabajar.

---

## Instalar la Kronio BackEnd

Kronio BackEnd es un proyecto Node.js y hay que instalar y configurar algunas dependencias:

1. Node.js +12.10.0, se debe instalar, y puede hacerlo con el binario desde la [página oficial](https://nodejs.org/en/). O utilzar la linea de comandos, utilizando [scoop](https://scoop.sh/) con el siguiente comando `scoop install nodejs`. Recuerde [configurar](https://geeksww.com/tutorials/operating_systems/ms_windows/administration/how_to_set_permissions_to_run_powershell_scripts.php) PowerShell para poder utilizar scoop.
2. Instalar [PostgresSQL](https://www.postgresql.org/download/) y dejar la configuración por defecto. Por ahora Kronio en desarrollo utiliza la clave de postgres: "hola1234", usted puede cambiar la contraseña y el usuario pero recuerde modificar el archivo environment/environment.dev.ts y no guardar el cambio de este archivo al guardar los datos en el servidor remoto. Esto se modificará en futura versión para dar independencia al desarrollador en este aspecto.
3. Crear la base de datos en PostgesSQL llamada **Takion**, también puede ser modificado el nombre siguiendo las mismas restricciones del paso anterior.
4. Instalar el **Kronio BackEnd** corriendo los siguientes comandos en la raíz del proyecto, la carpeta principal del repositorio:

	```
	npm install
	```
	
	**NOTA:** en **Windows** es necesario instalar previamente una dependencia extra, puede revisar el siguiente [enlace](https://github.com/nodejs/node-gyp), o escribir directamente esto en su PowerShell:

	```
	npm install --global --production windows-build-tools
	```

5. Probar **Kronio BackEnd**:

	```
	npm run start:dev
	```

	Abrir en el navegador: [http://127.0.0.1:9000/docs/](http://127.0.0.1:9000/docs/) para ver la documentacón de la api y probar la aplicación. Es importante que el puerto **9000** este libre para ejecutar la aplicación.

---

## Trabajar con Kronio BackEnd

Para trabajar con Kronio BackEnd en su repositorio local hay algunas condiciones/recomendaciones que debe recordad:

1. Nunca trabaje sobre la rama *master*, siempre realice una **branch** y trabaje sobre ella.

	1.1 Consola [enlace](https://confluence.atlassian.com/bitbucket/branching-a-repository-223217999.html).

	1.1 En SourceTree [enlace](https://confluence.atlassian.com/get-started-with-sourcetree/create-and-push-a-branch-to-the-remote-repository-git-847359118.html).
	
2. Escriba el código y realice commits en la rama (Branch) donde esta trabajando. Durante esta fase usted puede realizar los cambios, pruebas y commits que usted considere.
3. Cuando el o los propositos de su rama esten cumplidos deseará integrar su rama con el repositorio original. Puede seguir este [tutorial](https://www.youtube.com/watch?v=xl3nxfbGkzY) que es facilmente adaptable a nuestro caso.
