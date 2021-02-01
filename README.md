# HappyHour

## Scripts

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Structure

### Feature Folders

We organized the folder structure using a feature-based approach. This means that views, components, and modules are organized based on the corresponding feature that they implement. For example, anything related to a user should be put in the `/user` folder.

Every feature folder contains two subfolders and at least a `client.ts` file:

```
<feature>/
├── components/
│   ├── PageSpecificComponent.vue
├── views/
│   ├── PageOne.vue
│   └── PageTwo.vue
└── client.ts
```

- The `views/` folder contains all _screens_ related to this feature. A screen is defined as a component that you can access by going to a particular URL (e.g. `/event`).
- The `components/` folder contains all components used _exclusively_ in the screens for this feature. If a component can be reused in multiple screens, it should belong in the root `common` folder.
- `client.ts` contains all the possible actions available for this feature. For a user for example, this can include things like `login()`, `loginWithGoogle()`, `register()`, etc.

### Common Modules

Everything that can be reused across multiple features belong in the root directory.

- The `common/` folder contains generic components that can be reused across screens. This includes things like `AppButton`, `AppSnackbar`, etc.
- The `assets/` folder contains miscellaneous media.
- `db.ts` is the entry point to `firestore`. This should be reused across the various `client.ts` files.
