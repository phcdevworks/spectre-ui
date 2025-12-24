module.exports = {
  plugins: [
    require("postcss-import")({
      path: ["node_modules"],
      resolve: (id, basedir) => require.resolve(id, { paths: [basedir] }),
    }),
  ],
};
