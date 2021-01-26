const PedigreeCss = (function () {
    function traverse(curNode, ul) {
        const li = document.createElement('LI');
        ul.appendChild(li);

        const div = document.createElement('DIV');
        li.appendChild(div);

        createLink(curNode, div);

        const spouse = curNode.spouse;
        if (spouse) {
            createLink(spouse, div);
        }

        const children = curNode.directChildren;
        if (children && children.length > 0) {
            const innerUl = document.createElement('UL');
            li.appendChild(innerUl);

            for (let i = 0; i < children.length; i++) {
                const e = children[i];
                traverse(e, innerUl);
            }
        }
    }

    function createLink(personObj, div) {
        const link = document.createElement('A');
        link.textContent = personObj.lastName;
        div.appendChild(link);
    }

    /**
     * Ve bieu do gia pha.
     * @param pedigreeChart
     *     Doi tuong DOM dat bieu do
     */
    function buildPedigreeChart(pedigreeChart) {
        // Lay ra phan tu goc
        const root = personMap.ONGNGOAI;

        // Duyet cay
        traverse(root, pedigreeChart);
    }

    return {
        buildPedigreeChart
    };
})();
