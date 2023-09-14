import React from 'react';
// import * as Iconsai from 'react-icons/ai';
import * as Iconsbi from 'react-icons/bi';
import * as Iconsbs from 'react-icons/bs';
// import * as Iconscg from 'react-icons/cg';
// import * as Iconsci from 'react-icons/ci';
// import * as Iconsdi from 'react-icons/di';
import * as Iconsfa from 'react-icons/fa';
// import * as Iconsfi from 'react-icons/fi';
// import * as Iconsfc from 'react-icons/fc';
// import * as Iconsgi from 'react-icons/gi';
// import * as Iconsgo from 'react-icons/go';
// import * as Iconsgr from 'react-icons/gr';
// import * as Iconshi from 'react-icons/hi';
// import * as Iconshi2 from 'react-icons/hi2';
// import * as Iconsim from 'react-icons/im';
// import * as Iconsio from 'react-icons/io';
// import * as Iconsio5 from 'react-icons/io5';
// import * as Iconslib from 'react-icons/lib';
// import * as Iconslu from 'react-icons/lu';
// import * as Iconsmd from 'react-icons/md';
import * as Iconsri from 'react-icons/ri';
// import * as Iconsrx from 'react-icons/rx';
import * as Iconssi from 'react-icons/si';
// import * as Iconssl from 'react-icons/sl';
import * as Iconstb from 'react-icons/tb';
// import * as Iconstfi from 'react-icons/tfi';
// import * as Iconsti from 'react-icons/ti';
// import * as Iconsvsc from 'react-icons/vsc';
// import * as Iconswi from 'react-icons/wi';

const iconMappings = {
    // ai: Iconsai,
    bi: Iconsbi,
    bs: Iconsbs,
    // cg: Iconscg,
    // ci: Iconsci,
    // di: Iconsdi,
    fa: Iconsfa,
    // fi: Iconsfi,
    // fc: Iconsfc,
    // gi: Iconsgi,
    // go: Iconsgo,
    // gr: Iconsgr,
    // hi: Iconshi,
    // hi2: Iconshi2,
    // im: Iconsim,
    // io: Iconsio,
    // io5: Iconsio5,
    // lib: Iconslib,
    // lu: Iconslu,
    // md: Iconsmd,
    ri: Iconsri,
    // rx: Iconsrx,
    si: Iconssi,
    // sl: Iconssl,
    tb: Iconstb,
    // tfi: Iconstfi,
    // ti: Iconsti,
    // vsc: Iconsvsc,
    // wi: Iconswi
};

const DynamicIcon = ({ library, name, size = 40, color = "#a200be" }) => {
    const IconLibrary = iconMappings[library];
    if (!IconLibrary) {
        console.error(`Icon library "${library}" not found.`);
        return null; // You can return a default or placeholder icon
    }

    const IconComponent = IconLibrary[name];
    if (!IconComponent) {
        console.error(`Icon "${name}" not found in library "${library}".`);
        return null; // You can return a default or placeholder icon
    }

    return <IconComponent size={size} color={color} />;
};

export default DynamicIcon;
