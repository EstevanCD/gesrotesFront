import styled from "styled-components";
import useResposiveTo from "../hooks/useResponsive";

export const Header = styled.header`
background-color: #888;
`
export const Nav = styled.nav`
display: grid;
grid-template-columns: 1fr 1fr;
.logo{
    img{
        width: 100px;
        height: 100px;
    }
}
.btn-box{
    display: none;
    button{
        background-color: transparent;
        border: 1px solid #fff;
        border-radius: 8px;
        width: 100px;
        height: 40px;
        color: white;
        outline: none;
    }
}
${useResposiveTo('lg')}{
    .btn-box{
        display: block;
    }
    .icon-menu{
        display: none;
    }
    grid-template-columns: 1fr 4fr 1fr;
}

`
export const Menu = styled.ul`
display: none;

${useResposiveTo('lg')}{
    display: flex;
    flex-direction: row;
gap: 40px;
li{
    a{
        color: white;
        text-decoration: none;
    }
}
}
`