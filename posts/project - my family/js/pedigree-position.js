// https://www.familyecho.com/#view:START

const PedigreePosition = (function () {
    let leafy = 0;

    const nodeHeight = 40;
    const nodeMarginBottom = 20;

    function traverse(curNode, rawData, level) {
        console.log(curNode.code);
        curNode.level = level;

        const spouse = curNode.spouse;
        if (spouse) {
            console.log(spouse.code);
            spouse.level = curNode.level;
        }

        const children = curNode.directChildren;
        if (children && children.length > 0) {
            isLeaf = false;

            for (let i = 0; i < children.length; i++) {
                const e = children[i];
                traverse(e, rawData, level + 1);
            }

            processBranchNode(curNode, spouse, children);
        } else {
            processLeafNode(curNode, spouse);
        }
    }

    function processLeafNode(curNode, spouse) {
        curNode.y = leafy;
        leafy += nodeHeight + nodeMarginBottom;
        if (spouse) {
            leafy += nodeHeight + nodeMarginBottom;
        }

        if (!spouse) {
            curNode.actualY = curNode.y + nodeHeight / 2;
        } else if (spouse.gender == 'female') {
            curNode.actualY = curNode.y + nodeHeight / 2;
        } else {
            curNode.actualY = curNode.y + nodeHeight / 2 + nodeHeight + nodeMarginBottom;
        }
    }

    function processBranchNode(curNode, spouse, children) {
        let min = Number.MAX_VALUE;
        let max = 0;
        for (let i = 0; i < children.length; i++) {
            const e = children[i];
            if (e.y < min) {
                min = e.actualY;
            }
            if (e.y > max) {
                max = e.actualY;
            }
        }

        const mid = (min + max) / 2;

        if (!spouse) {
            curNode.y = mid - nodeHeight / 2;
            curNode.actualY = mid;
        } else if (spouse.gender == 'female') {
            curNode.y = mid - nodeHeight - nodeMarginBottom / 2;
            curNode.actualY = mid - nodeHeight / 2 - nodeMarginBottom / 2;
        } else {
            curNode.y = mid - nodeHeight - nodeMarginBottom / 2;
            curNode.actualY = mid + nodeHeight / 2 + nodeMarginBottom / 2;
        }
    }

    function buildGeneration(pedigreeChart, rawData, level) {
        const generation = document.createElement('DIV');
        generation.className = 'generation';
        buildSiblings(generation, rawData, level);
        pedigreeChart.appendChild(generation);
    }

    function buildSiblings(generation, rawData, level) {
        let curParent;
        let siblingsNode;

        let tempSiblings = [];

        for (let i = 0; i < rawData.length; i++) {
            const curNode = rawData[i];
            if (curNode.level == level && (curNode.isRoot || curNode.father)) {
                if (!curNode.father || curNode.father.code != curParent) {
                    // Tao 1 the moi
                    siblingsNode = document.createElement('DIV');
                    siblingsNode.className = 'siblings';
                    generation.appendChild(siblingsNode);

                    buildSiblingsConnector(siblingsNode, tempSiblings);

                    curParent = curNode.father ? curNode.father.code : '';

                    tempSiblings = [];
                }

                buildCouple(siblingsNode, curNode, rawData);
                tempSiblings.push(curNode);
            }
        }

        buildSiblingsConnector(siblingsNode, tempSiblings);
    }

    function buildSiblingsConnector(siblingsNode, tempSiblings) {
        if (tempSiblings.length > 0) {
            const firstObj = tempSiblings[0];
            const lastObj = tempSiblings[tempSiblings.length - 1];
            const firstY = firstObj.actualY;
            const lastY = lastObj.actualY;

            if (firstObj.father) {
                const toParentConnector = document.createElement('DIV');
                toParentConnector.className = 'toParentConnector';
                toParentConnector.style.top = (firstY + (lastY - firstY) / 2) + 'px';
                siblingsNode.appendChild(toParentConnector);
            }

            if (tempSiblings.length > 1) {
                const siblingsConnector = document.createElement('DIV');
                siblingsConnector.className = 'siblingsConnector';
                siblingsConnector.style.top = firstY + 'px';
                siblingsConnector.style.height = (lastY - firstY) + 'px';
                siblingsNode.appendChild(siblingsConnector);
            }
        }
    }

    function buildCouple(siblingsNode, curNode, rawData) {
        const coupleNode = document.createElement('DIV');
        coupleNode.className = 'couple';
        siblingsNode.appendChild(coupleNode);

        coupleNode.style.top = curNode.y + 'px';

        const spouse = curNode.spouse;

        if (!spouse) {
            buildPerson(coupleNode, curNode);
        } else if (spouse.gender == 'female') {
            buildPerson(coupleNode, curNode);
            buildPerson(coupleNode, spouse);
            buildCoupleConnector(coupleNode);
        } else {
            buildPerson(coupleNode, spouse);
            buildPerson(coupleNode, curNode);
            buildCoupleConnector(coupleNode);
        }
    }

    function buildPerson(coupleNode, personObj) {
        const personWrapper = document.createElement('DIV');
        personWrapper.className = 'personWrapper';
        coupleNode.appendChild(personWrapper);

        const person = document.createElement('DIV');
        person.className = 'person';
        person.textContent = personObj.lastName;
        // person.dataset.personCode = personObj.code;
        personWrapper.appendChild(person);

        if (!personObj.isRoot && personObj.father) {
            const isDirect = document.createElement('DIV');
            isDirect.className = 'isDirect';
            personWrapper.appendChild(isDirect);
        }
    }

    function buildCoupleConnector(coupleNode) {
        const coupleConnector = document.createElement('DIV');
        coupleConnector.className = 'coupleConnector';
        coupleNode.appendChild(coupleConnector);
    }

    function getNumberOfLevel() {
        let noLevel = 1;
        for (let i = 0; i < people.length; i++) {
            const e = people[i];
            if (e.level + 1 > noLevel) {
                noLevel = e.level + 1;
            }
        }
        return noLevel;
    }

    /**
     * Ve bieu do gia pha.
     * @param pedigreeChart
     *     Doi tuong DOM dat bieu do
     */
    function buildPedigreeChart(pedigreeChart) {
        // Mang JSON du lieu
        const rawData = people;

        // Lay ra phan tu goc
        const root = personMap.ONGNGOAI;
        root.isRoot = true;

        // Duyet cay
        traverse(root, rawData, 0);

        // Lay ra so cap cua cay
        const noLevel = getNumberOfLevel();
        console.log(noLevel);

        // Duyet cac cap cua cay
        for (let level = 0; level < noLevel; level++) {
            buildGeneration(pedigreeChart, rawData, level);
        }

        // Cap nhat lai chieu dai cua bieu do
        pedigreeChart.style.height = (leafy + 0) + 'px';
    }

    return {
        buildPedigreeChart
    };
})();
