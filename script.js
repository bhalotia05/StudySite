let hamburgerbtn = document.querySelector(".hamburger");
        let nav_list = document.querySelector(".nav-list");
        hamburgerbtn.addEventListener("click", () => {
            hamburgerbtn.classList.toggle("active");
            nav_list.classList.toggle("active");
        });
        class TrieNode {
            constructor() {
                this.children = {};
                this.isEndOfWord = false;
            }
        }

        class Trie {
            constructor() {
                this.root = new TrieNode();
            }

            insert(word) {
                let node = this.root;
                for (let char of word) {
                    if (!node.children[char]) {
                        node.children[char] = new TrieNode();
                    }
                    node = node.children[char];
                }
                node.isEndOfWord = true;
            }

            search(prefix) {
                let node = this.root;
                for (let char of prefix) {
                    if (!node.children[char]) {
                        return [];
                    }
                    node = node.children[char];
                }
                return this.getSuggestions(node, prefix);
            }

            getSuggestions(node, prefix) {
                let suggestions = [];
                if (node.isEndOfWord) {
                    suggestions.push(prefix);
                }
                for (let char in node.children) {
                    suggestions = suggestions.concat(this.getSuggestions(node.children[char], prefix + char));
                }
                return suggestions;
            }
        }

        // Create a trie and populate it with sample data
        const trie = new Trie();
        const words = ["Physics", "Chemistry", "Maths", "Biology", "Commerce"];
        words.forEach(word => trie.insert(word.toLowerCase()));

        // Handle input event on search input
        const searchInput = document.getElementById('searchInput');
        const suggestionsDiv = document.getElementById('suggestions');

        searchInput.addEventListener('input', function() {
            const prefix = this.value.toLowerCase().trim();
            if (prefix === '') {
                suggestionsDiv.innerHTML = ''; // Clear suggestions if search input is empty
            } else {
                const suggestions = trie.search(prefix);
                suggestionsDiv.innerHTML = ''; // Clear previous suggestions
                suggestions.forEach(suggestion => {
                    suggestionsDiv.innerHTML += `<div>${suggestion}</div>`;
                });
            }
        });
        document.getElementById("showTodoList").addEventListener("click", function() {
            var todoContainer = document.getElementById("todoContainer");
            todoContainer.style.display = "block";
        });
        
        function addTodo() {
            var todoInput = document.getElementById("todoInput");
            var todoList = document.getElementById("todoList");
            
            if (todoInput.value === '') {
                alert("Please enter a task.");
                return;
            }
        
            var li = document.createElement("li");
            var todoText = document.createTextNode(todoInput.value);
            li.appendChild(todoText);
        
            var completeButton = document.createElement("button");
            completeButton.innerHTML = "Done";
            completeButton.onclick = function() {
                li.classList.toggle("completed");
            };
            li.appendChild(completeButton);
        
            var editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.onclick = function() {
                var newText = prompt("Edit task:", todoText.textContent);
                if (newText !== null) {
                    todoText.textContent = newText;
                }
            };
            li.appendChild(editButton);
        
            var removeButton = document.createElement("button");
            removeButton.innerHTML = "Remove";
            removeButton.onclick = function() {
                todoList.removeChild(li);
            };
            li.appendChild(removeButton);
        
            todoList.appendChild(li);
            
            todoInput.value = "";
        }