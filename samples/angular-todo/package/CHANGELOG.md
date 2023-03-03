# [1.0.0-beta.2](https://github.com/forgerock/forgerock-web-login-framework/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2023-02-16)


### Bug Fixes

* **types:** fix runtime and compile-time type bugs in widget API ([3ee678d](https://github.com/forgerock/forgerock-web-login-framework/commit/3ee678d512cfd2f2de76b158f3493edd8428759f))
* **widget:** update-package-lock ([ac58f93](https://github.com/forgerock/forgerock-web-login-framework/commit/ac58f938a3ac7810cf0e6806d43f54493a19216f))


### Features

* **config:** add ability to configure widget outside of Widget instantiation ([892a40e](https://github.com/forgerock/forgerock-web-login-framework/commit/892a40e4900650bf435d1062e1f6a6d255445fa4))

# 1.0.0-beta.1 (2023-02-07)


### Bug Fixes

* **add env in release:** we need to pass env var in release ([5162f4c](https://github.com/forgerock/forgerock-web-login-framework/commit/5162f4c8dc3bbcf5b7fec019dea87354a184a3b8))
* **animations:** improve checkbox and radio animations ([46017da](https://github.com/forgerock/forgerock-web-login-framework/commit/46017daac6f63f9f05a845475af2850b71f7cb38))
* **api:** fix locale api crashing on unsupported locale ([4ddf2c2](https://github.com/forgerock/forgerock-web-login-framework/commit/4ddf2c253503b38eec3d421f520b1a6f3d62cf89))
* **build:** fix build, type and test issues ([bee9d8f](https://github.com/forgerock/forgerock-web-login-framework/commit/bee9d8f997f4713ab76cbaa21f2f1db8160c3fe8))
* **ci:** fix ci semantic release ([fde147f](https://github.com/forgerock/forgerock-web-login-framework/commit/fde147f027afaf109a74695097515fdf2ff15306))
* **circular-deps:** stage and callbacks had circular deps ([46cfea9](https://github.com/forgerock/forgerock-web-login-framework/commit/46cfea904da28cd20ecf0e222e4b1a77acf7a38e))
* **david-feedback:** fix two issue caught by David ([8eca36e](https://github.com/forgerock/forgerock-web-login-framework/commit/8eca36eda76993cb5161fae48997dada0f7bbcea))
* **e2e:** fix inline e2e to use login, not registration ([6a5af0f](https://github.com/forgerock/forgerock-web-login-framework/commit/6a5af0f3c6262926fbf3b6df346b040bb88cbeac))
* **env to release step:** add env to release step build ([c1bb60b](https://github.com/forgerock/forgerock-web-login-framework/commit/c1bb60bc44e712131e10ac7a662b612880d7091d))
* **feedback:** address ryan's PR feedback ([2186f8a](https://github.com/forgerock/forgerock-web-login-framework/commit/2186f8a9b433c6b7ab234f434991749a31901877))
* **fix-release:** release semantic is now on 18 so we are moving the engine to support 18 ([0340f01](https://github.com/forgerock/forgerock-web-login-framework/commit/0340f012613a531e982d19bf34af795db1d1ad13))
* **fixing release:** commit the correct assets hopefully ([1df4f27](https://github.com/forgerock/forgerock-web-login-framework/commit/1df4f279debc05952de7eb936b04a5be4bf9dd65))
* **journey:** improve journey typings ([51c8a86](https://github.com/forgerock/forgerock-web-login-framework/commit/51c8a8661e0756b50fefee916d16c2bee7171e5d))
* links were required which makes zod throw an error in prod! ([125be19](https://github.com/forgerock/forgerock-web-login-framework/commit/125be19abe9876e18bce7d56d84879bfd611d856))
* **lint:** fixing lint and prettier issues ([c697d0f](https://github.com/forgerock/forgerock-web-login-framework/commit/c697d0f14dc09888a66a7f74626d6678a833ab3c))
* **locale:** switch from dynamic imports to page endpoints ([0797d75](https://github.com/forgerock/forgerock-web-login-framework/commit/0797d75a1991862aebd987c0eb3a44c61b63abc0))
* **move-readme-with-sh:** move the readme file in exec prepare step ([6640112](https://github.com/forgerock/forgerock-web-login-framework/commit/6640112e7c86879b18e25018bb28b98e689df1ad))
* **package/package.json:** we lost the package.json in package dir ([4790dd1](https://github.com/forgerock/forgerock-web-login-framework/commit/4790dd11925c8d629fe6bd5b36781ef19328824b))
* **policies:** fixing the policy rendering and logic ([569f8b1](https://github.com/forgerock/forgerock-web-login-framework/commit/569f8b11cc6277903f5105230cd63aecbcf9fb5f))
* **readme:** address feedback from SDKS-2070 ([c83c768](https://github.com/forgerock/forgerock-web-login-framework/commit/c83c768e28023a70f3997e1e10d172be30387188))
* **readme:** improve README.md for beta testing ([bf13af6](https://github.com/forgerock/forgerock-web-login-framework/commit/bf13af6074f0b1eaa49be6ee1b2a890a2579845b))
* **release-process:** husky breaks ci commits so we should disable it ([604783b](https://github.com/forgerock/forgerock-web-login-framework/commit/604783ba2f9cf5347079379bd4277707d1619bbc))
* **release:** fix semantic release github by using this branch while the merge happens ([6591d84](https://github.com/forgerock/forgerock-web-login-framework/commit/6591d84b17af5b969bb93f16881ec04bc50413d1))
* **root:** update publishing to add readme and changelog ([568ee71](https://github.com/forgerock/forgerock-web-login-framework/commit/568ee71245737a15b4ecb6637271e671e4cc8a4f))
* **ssr:** temporarily remove initialization of journey on server ([c231256](https://github.com/forgerock/forgerock-web-login-framework/commit/c231256c9ba33bdcadcdaedc58f77d8a7218eee0))
* **storybook:** fix step components in storybook ([2a6df62](https://github.com/forgerock/forgerock-web-login-framework/commit/2a6df6259179921f4523db6c4f9c33c287df8736))
* **tests:** fix i18n bugs breaking e2e ([a852c04](https://github.com/forgerock/forgerock-web-login-framework/commit/a852c04cc7444d57c37890323bc4daa982d94290))
* **types:** use Maybe as Ryan suggested ([1d78fa7](https://github.com/forgerock/forgerock-web-login-framework/commit/1d78fa77fc3596e123958fb31eee2905059c96a1))
* **typings-buttons:** fixed a few typings and changed custom css for button ([26059fc](https://github.com/forgerock/forgerock-web-login-framework/commit/26059fcecb4d9440e7bcb60df6e6102ae81a3e77))
* **update-rollup:** es only locally, cjs in CI for release ([40a2f55](https://github.com/forgerock/forgerock-web-login-framework/commit/40a2f55887c9c5b7ed7eef47339c035d6c766afe))
* **validations:** policy validation and error messaging ([306d2db](https://github.com/forgerock/forgerock-web-login-framework/commit/306d2dbc14e03db4a144bd5437756c4246ca5a5d))
* **widget-journey-callback:** decrease coupling between components ([7bc3c4e](https://github.com/forgerock/forgerock-web-login-framework/commit/7bc3c4e60eed5c61b8fe96baeeddb58e5aefb8a5))


### Features

* **animated:** add focus indicator for animated radio and checkbox ([939d8b1](https://github.com/forgerock/forgerock-web-login-framework/commit/939d8b117e4b46e5c6f8809a7deba99128d2d9bc))
* **callbacks:** add hidden-value callback and radio option for choice ([090e35c](https://github.com/forgerock/forgerock-web-login-framework/commit/090e35c2df50fd7e0aac1a9eb499418ebc28b70d))
* **callbacks:** add social login providers ([b93edf7](https://github.com/forgerock/forgerock-web-login-framework/commit/b93edf7adb08eff698ae1009b280e663175ec8d1))
* **callbacks:** add social login support ([651e691](https://github.com/forgerock/forgerock-web-login-framework/commit/651e691228446c65d55746420bc9113a65c4d5b4))
* **callbacks:** added support for confirmation, choice and password with stage metadata ([3a296d7](https://github.com/forgerock/forgerock-web-login-framework/commit/3a296d7c666d8e902a3b18ab830a31a734b06d6f))
* **callbacks:** adjust T&C callback to address Friday's feedback ([6b54121](https://github.com/forgerock/forgerock-web-login-framework/commit/6b54121ad877d4f97c3c41ab56cfbfaa5b4b9656))
* **callbacks:** display link to terms and conditions ([419eab0](https://github.com/forgerock/forgerock-web-login-framework/commit/419eab09fee6bf826212ab1ddf221b63363ed65e))
* **callbacks:** text-output and confirmation callback complete ([5476f4e](https://github.com/forgerock/forgerock-web-login-framework/commit/5476f4eba986cd0b975b63728be365d547395a24))
* **checkbox:** add animated checkbox composition ([c5cc218](https://github.com/forgerock/forgerock-web-login-framework/commit/c5cc2181e3e583050abfe673c2c981b4fa961e1c))
* **close-style:** add autoClose event and fix CSS for KBA ([d8f55f8](https://github.com/forgerock/forgerock-web-login-framework/commit/d8f55f8e2dea864969f5da038d4341d88f0706d2))
* **components:** start simple component development ([4dc8d2c](https://github.com/forgerock/forgerock-web-login-framework/commit/4dc8d2c44bd64b31d242f0eca668b3c6db3e5898))
* **core:** add primitives, stories, tests, a11y ([e8f94ee](https://github.com/forgerock/forgerock-web-login-framework/commit/e8f94eec0d506d6516097a4274b82f2c5f339e26))
* **default-theme:** create default theme, primitives only ([0e84a29](https://github.com/forgerock/forgerock-web-login-framework/commit/0e84a296c27db35bac44f0f8ca60d2c9f730521b))
* **docs:** add docs site internally to project ([d553a12](https://github.com/forgerock/forgerock-web-login-framework/commit/d553a12099cd0ba8633328ccb913464036b880c5))
* **error-handling:** improve form error handling ([9346305](https://github.com/forgerock/forgerock-web-login-framework/commit/9346305cfeb514a118f3f432ef8e329e1479606e))
* **i18n:** adding internationalization ([2795169](https://github.com/forgerock/forgerock-web-login-framework/commit/2795169a3c78fef0b93b36d12d490753d0073128))
* **i18n:** improve internationalization ([4d95aca](https://github.com/forgerock/forgerock-web-login-framework/commit/4d95aca8eeb3116c3caf5667cfa79915f78fcf0f))
* **journey:** add configurable journeys ([96d83f4](https://github.com/forgerock/forgerock-web-login-framework/commit/96d83f440bf7799f137d7589b285c4cf1f203cfa))
* **journey:** add stage attribute metadata to existing metadata journey state ([55bbb63](https://github.com/forgerock/forgerock-web-login-framework/commit/55bbb63d79304d52764ad31905fd655d13105d39))
* **journeys:** continue configurable journey work ([1b4fb19](https://github.com/forgerock/forgerock-web-login-framework/commit/1b4fb19982690282891d99c77fa219ce7e6880f2))
* **journeys:** fixing configurable journey issues and storybook ([cb3f762](https://github.com/forgerock/forgerock-web-login-framework/commit/cb3f7628f98f8f2a9e3ca2112254a737e12e8990))
* **journeys:** improved types for configured journeys ([86c32ec](https://github.com/forgerock/forgerock-web-login-framework/commit/86c32ec8cbf69f90ad4cb7a4cfb5d245299bce50))
* **kba:** add custom question feature ([8a71aa9](https://github.com/forgerock/forgerock-web-login-framework/commit/8a71aa9f108acf0d7d3f8f64b420ebf3c28cd0cf))
* **logo:** add logo support ([e9e2b18](https://github.com/forgerock/forgerock-web-login-framework/commit/e9e2b18e267c44cec9c0398e06283493af498a8e))
* **notify-slack:** slack notification on semantic-version-release ([d8552a0](https://github.com/forgerock/forgerock-web-login-framework/commit/d8552a03a8cfdf3ce4f484e5de57c2a74ae26c5d))
* **policies:** improve policy handling and IDM validation failure ([59898c2](https://github.com/forgerock/forgerock-web-login-framework/commit/59898c2cee55bf5928898f60d968198b3b1fef24))
* **quality:** improve testing and code quality ([67540b2](https://github.com/forgerock/forgerock-web-login-framework/commit/67540b284851b2b1b6afacb1d6ea7b01721bc613))
* **radio:** add standard and animated radio buttons ([9c16408](https://github.com/forgerock/forgerock-web-login-framework/commit/9c1640899d9a71f4ffd54f1afd43d8f127b8a397))
* **root:** update-package-publishing ([dd4e771](https://github.com/forgerock/forgerock-web-login-framework/commit/dd4e771dded5f7a112f4221296f1f5f07e662151))
* **self-submitting:** add self-submitting form and pollingwait support ([18e213f](https://github.com/forgerock/forgerock-web-login-framework/commit/18e213f0f72f5e4cc3fd86515c27eb3f15185395))
* **semantic-release:** semantic-release-and-ci ([61e6a64](https://github.com/forgerock/forgerock-web-login-framework/commit/61e6a64fbb7366cbbf56c9c3a2079764a5fd4eb5))
* **sessions:** clean up proxy and session mgmt ([8af4101](https://github.com/forgerock/forgerock-web-login-framework/commit/8af410185436b2623ababd97424b0a564daa0fa8))
* **ssr:** improve server-side rendering with initial call on server ([e00c633](https://github.com/forgerock/forgerock-web-login-framework/commit/e00c6339eafdf12f7022100f78d5896034ce4d02))
* **storybook:** add storybook with vite-builder ([b595db6](https://github.com/forgerock/forgerock-web-login-framework/commit/b595db6af7d134aaf3427e8102f102b2db81e2d2))
* **styles:** organize styling approach ([91e3777](https://github.com/forgerock/forgerock-web-login-framework/commit/91e37776a59b1b6c6aacb3c3dd5fa5aa59b8edb0))
* **suspended-id:** add support for suspended id ([d6d53ef](https://github.com/forgerock/forgerock-web-login-framework/commit/d6d53efe8b9d23c00fea5dec378af4449bcf25e3))
* **testing-doc:** add testing doc and improve readme ([bfd36f5](https://github.com/forgerock/forgerock-web-login-framework/commit/bfd36f55916b8b46d5b29aad7fb07ab1dbafdec6))
* text-output-support ([d88e691](https://github.com/forgerock/forgerock-web-login-framework/commit/d88e691d9a415bb22b2e3f5d82cc8acbbdb787aa))
* **theme:** add dark mode & error handling to primitives ([d885ebe](https://github.com/forgerock/forgerock-web-login-framework/commit/d885ebe9c2365163b9b5f77c6b7f8c77de319419))
* **theme:** improve input validation and error reporting ([52ed92c](https://github.com/forgerock/forgerock-web-login-framework/commit/52ed92cc610cdf0965b8fd7a1b46c9ed6a8a2ac3))
* **theme:** improve variable uses for better customization ([91980fc](https://github.com/forgerock/forgerock-web-login-framework/commit/91980fc41580d096e994171645e00251323b3684))
* upgrade-ci ([371e73f](https://github.com/forgerock/forgerock-web-login-framework/commit/371e73fe1cb05661356e9d693992a965f81440ef))
* **validation-stages:** added Zod for data validation and custom stages ([a271100](https://github.com/forgerock/forgerock-web-login-framework/commit/a271100e10529518fbe13ede800f32a3034f0ff5))
* **validation:** input errors from server and keyboard focus ([1d19af8](https://github.com/forgerock/forgerock-web-login-framework/commit/1d19af87bab258a768bf55c75476b0c38b2b3735))
* **vitest:** add vitest and fix storybook config ([2196ae0](https://github.com/forgerock/forgerock-web-login-framework/commit/2196ae0fce19ff47c4e17f743aa57477ae33f209))
* **widget-callbacks:** add inline widget and callbacks from sample apps ([62cb811](https://github.com/forgerock/forgerock-web-login-framework/commit/62cb811e3705bada9fdaeb7ba589bcbabf8ed58f))

# [1.0.0-alpha.12](https://github.com/cerebrl/forgerock-web-login-framework/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2023-01-30)


### Bug Fixes

* **update-rollup:** es only locally, cjs in CI for release ([40a2f55](https://github.com/cerebrl/forgerock-web-login-framework/commit/40a2f55887c9c5b7ed7eef47339c035d6c766afe))

# [1.0.0-alpha.11](https://github.com/cerebrl/forgerock-web-login-framework/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2023-01-26)

### Features

- **notify-slack:** slack notification on semantic-version-release ([d8552a0](https://github.com/cerebrl/forgerock-web-login-framework/commit/d8552a03a8cfdf3ce4f484e5de57c2a74ae26c5d))

# [1.0.0-alpha.10](https://github.com/cerebrl/forgerock-web-login-framework/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2023-01-25)

### Bug Fixes

- links were required which makes zod throw an error in prod! ([125be19](https://github.com/cerebrl/forgerock-web-login-framework/commit/125be19abe9876e18bce7d56d84879bfd611d856))

# [1.0.0-alpha.9](https://github.com/cerebrl/forgerock-web-login-framework/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2023-01-25)

### Features

- **callbacks:** added support for confirmation, choice and password with stage metadata ([3a296d7](https://github.com/cerebrl/forgerock-web-login-framework/commit/3a296d7c666d8e902a3b18ab830a31a734b06d6f))
- **journey:** add stage attribute metadata to existing metadata journey state ([55bbb63](https://github.com/cerebrl/forgerock-web-login-framework/commit/55bbb63d79304d52764ad31905fd655d13105d39))

# [1.0.0-alpha.8](https://github.com/cerebrl/forgerock-web-login-framework/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2023-01-19)

### Bug Fixes

- **release-process:** husky breaks ci commits so we should disable it ([604783b](https://github.com/cerebrl/forgerock-web-login-framework/commit/604783ba2f9cf5347079379bd4277707d1619bbc))
- **root:** update publishing to add readme and changelog ([568ee71](https://github.com/cerebrl/forgerock-web-login-framework/commit/568ee71245737a15b4ecb6637271e671e4cc8a4f))
