module.exports = {
  // presets: [
  //   '@vue/cli-plugin-babel/preset'
  // ]

  presets: [ [ "@vue/app", { useBuiltIns: "entry" } ] ],
  "plugins":[
    [
      "transform-modules",
      {
        "cube-ui": {
          "transform": "cube-ui/src/modules/${member}",
          "kebabCase": true
        }
      }
    ]
  ]
}
