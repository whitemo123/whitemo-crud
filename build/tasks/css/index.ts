import { src, dest } from "gulp"
import less from "gulp-less"
import gulpSass from "gulp-sass"
import dartSass from "sass"
import autoPrefixer from "gulp-autoprefixer";
import { pkgRoot, buildRoot } from "../../utils/paths";

export const buildCss = async (projectNo: string) => {
  if (projectNo === 'element') {
    return buildSass(projectNo)
  }
}

// 打包less文件
export const buildLess = (projectNo: string) => {
  return src(`${pkgRoot}/${projectNo}/components/**/style/**.less`)
    .pipe(less())
    .pipe(autoPrefixer())
    .pipe(dest(`${buildRoot}/${projectNo}/lib/components`))
    .pipe(dest(`${buildRoot}/${projectNo}/es/components`));
}

// 打包scss文件
export const buildSass = (projectNo: string) => {
  const sass = gulpSass(dartSass);
  return src(`${pkgRoot}/${projectNo}/components/**/style/**.scss`)
    .pipe(sass.sync())
    .pipe(autoPrefixer())
    .pipe(dest(`${buildRoot}/${projectNo}/lib/components`))
    .pipe(dest(`${buildRoot}/${projectNo}/es/components`));
}
