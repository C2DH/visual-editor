# The VisualEditor
This is the visual companion of Miller for our the digital exibition websites.

Build a specific version for a project is as easy as:

- get your project name, e.g. `histjust`
- get the git tag in `master` branch with `git tag`, e.g. `v1.1.4`
- copy `cp .env.example .env` and edit `REACT_APP_MILLER_CLIENT_ID` according to the target Miller instance
- verify the values of `REACT_APP_DOCUMENT_SCHEMA`
- build using `make` and concatenate project name and version number in the `BUILD_TAG`: env variable

    ```
    BUILD_TAG=your-visual-editor-v1.1.4 make build-docker-image
    ```

## Local development with setup proxy

Instead of using just `PROXY_HOST`, from v1.1.4 onwards we use setupProxy using the http middleware proxy.
If yoiu run using `make run-dev` or `yarn start` a nice setupProxy.log file will appear next to package.json
that would make transparent which Proxy is using.

## Additional Notes

In the source code we usually refer to the env variable `REACT_APP_EDITOR_BASENAME`.
This is generated from the `PUBLIC_URL` that is not integrated in the react app as such.
